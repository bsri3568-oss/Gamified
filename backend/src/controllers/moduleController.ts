import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { QuizSubmission, ApiResponse, AuthRequest } from '../types';
import logger from '../utils/logger';

const calculateLevel = (points: number): number => {
  return Math.floor(points / 500) + 1;
};

const calculateBadges = (score: number, moduleType: string, streak: number): string[] => {
  const badges: string[] = [];

  if (score === 100) badges.push('Perfect Score');
  if (score >= 90) badges.push('Excellence');
  if (score >= 80) badges.push('Great Work');
  if (streak >= 7) badges.push('Week Warrior');
  if (streak >= 30) badges.push('Month Master');
  if (moduleType === 'challenge' && score >= 70) badges.push('Eco Champion');

  return badges;
};

export const getModules = async (req: Request, res: Response) => {
  try {
    const { type, difficulty } = req.query;

    let query = supabase.from('modules').select('*');

    if (type) query = query.eq('module_type', type);
    if (difficulty) query = query.eq('difficulty', difficulty);

    const { data: modules, error } = await query;

    if (error) throw error;

    const sanitizedModules = modules?.map(m => {
      const questions = (m.questions as any[]).map((q: any) => ({
        questionText: q.questionText,
        choices: q.choices
      }));
      return { ...m, questions };
    });

    res.json({
      success: true,
      message: 'Modules retrieved successfully',
      data: { modules: sanitizedModules }
    });
  } catch (error) {
    logger.error('Get modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve modules',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getModuleById = async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;

    const { data: module, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();

    if (error || !module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    const sanitizedQuestions = (module.questions as any[]).map((q: any) => ({
      questionText: q.questionText,
      choices: q.choices
    }));

    res.json({
      success: true,
      message: 'Module retrieved successfully',
      data: {
        module: {
          ...module,
          questions: sanitizedQuestions
        }
      }
    });
  } catch (error) {
    logger.error('Get module by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve module',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { moduleId } = req.params;
    const { answers, timeSpent }: QuizSubmission = req.body;
    const userId = req.user!.id;

    const { data: module, error: moduleError } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();

    if (moduleError || !module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    let correctAnswers = 0;
    const questions = module.questions as any[];
    const totalQuestions = questions.length;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswerIndex) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const completed = score >= 60;

    const pointsEarned = Math.round(module.points_reward * (score / 100));

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const currentStreak = 0;
    const newBadges = calculateBadges(score, module.module_type, currentStreak);
    const existingBadges = user.badges as string[] || [];
    const allBadges = [...new Set([...existingBadges, ...newBadges])];

    const newPoints = user.points + pointsEarned;
    const newLevel = calculateLevel(newPoints);

    await supabase
      .from('users')
      .update({
        points: newPoints,
        badges: allBadges,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    await supabase
      .from('progress')
      .insert({
        user_id: userId,
        module_id: moduleId,
        score,
        completed,
        answers,
        eco_actions: completed ? 1 : 0,
        badges_earned: newBadges
      });

    logger.info(`Quiz submitted: User ${userId}, Module ${moduleId}, Score ${score}%`);

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        score,
        completed,
        pointsEarned,
        newBadges,
        totalPoints: newPoints,
        newLevel,
        correctAnswers,
        totalQuestions,
        explanations: questions.map((q: any) => q.explanation)
      }
    });
  } catch (error) {
    logger.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getUserProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: progress, error } = await supabase
      .from('progress')
      .select(`
        *,
        modules (
          title,
          difficulty,
          points_reward
        )
      `)
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) throw error;

    const stats = {
      totalModules: progress?.length || 0,
      completedModules: progress?.filter(p => p.completed).length || 0,
      averageScore: progress && progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
        : 0,
      totalTimeSpent: 0
    };

    res.json({
      success: true,
      message: 'User progress retrieved successfully',
      data: { progress, stats }
    });
  } catch (error) {
    logger.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user progress',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
