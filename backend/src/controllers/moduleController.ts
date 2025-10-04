import { Request, Response } from 'express';
import Module from '../models/Module';
import Progress from '../models/Progress';
import User from '../models/User';
import { QuizSubmission, ApiResponse, AuthRequest } from '../types';
import { calculateLevel, calculateBadges } from '../utils/auth';
import logger from '../utils/logger';

export const getModules = async (req: Request, res: Response) => {
  try {
    const { type, difficulty, category } = req.query;
    
    const filter: any = {};
    if (type) filter.moduleType = type;
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const modules = await Module.find(filter).select('-questions.correctAnswerIndex -questions.explanation');
    
    res.json({
      success: true,
      message: 'Modules retrieved successfully',
      data: { modules }
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
    
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Don't send correct answers to frontend
    const moduleData = module.toObject();
    moduleData.questions = moduleData.questions.map(q => ({
      questionText: q.questionText,
      choices: q.choices
    }));

    res.json({
      success: true,
      message: 'Module retrieved successfully',
      data: { module: moduleData }
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
    const userId = req.user!._id;

    // Get module with correct answers
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = module.questions.length;
    
    answers.forEach((answer, index) => {
      if (answer === module.questions[index].correctAnswerIndex) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const completed = score >= 60; // 60% to pass

    // Calculate points earned (base points * score multiplier)
    const pointsEarned = Math.round(module.points * (score / 100));

    // Get user's current data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate new badges
    const newBadges = calculateBadges(score, module.moduleType, user.streak);
    const allBadges = [...new Set([...user.badges, ...newBadges])];

    // Update user points and level
    const newPoints = user.points + pointsEarned;
    const newLevel = calculateLevel(newPoints);

    // Update user
    await User.findByIdAndUpdate(userId, {
      points: newPoints,
      level: newLevel,
      badges: allBadges,
      streak: completed ? user.streak + 1 : 0
    });

    // Save progress
    const progress = new Progress({
      userId,
      moduleId,
      score,
      completed,
      answers,
      ecoActions: completed ? 1 : 0,
      badgesEarned: newBadges,
      timeSpent
    });

    await progress.save();

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
        explanations: module.questions.map(q => q.explanation)
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
    const userId = req.user!._id;
    
    const progress = await Progress.find({ userId })
      .populate('moduleId', 'title category difficulty points')
      .sort({ timestamp: -1 });

    const stats = {
      totalModules: progress.length,
      completedModules: progress.filter(p => p.completed).length,
      averageScore: progress.length > 0 
        ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
        : 0,
      totalTimeSpent: progress.reduce((sum, p) => sum + p.timeSpent, 0)
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