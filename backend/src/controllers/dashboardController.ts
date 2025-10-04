import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../types';
import logger from '../utils/logger';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole === 'student') {
      return getStudentDashboard(req, res);
    } else if (userRole === 'teacher') {
      return getTeacherDashboard(req, res);
    } else if (userRole === 'parent') {
      return getParentDashboard(req, res);
    }

    res.status(400).json({
      success: false,
      message: 'Invalid user role'
    });
  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const getStudentDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: userProgress } = await supabase
      .from('progress')
      .select('*, modules(*)')
      .eq('user_id', userId);

    const completedModuleIds = userProgress
      ?.filter(p => p.completed)
      .map(p => p.module_id) || [];

    let recommendedQuery = supabase
      .from('modules')
      .select('*')
      .limit(6);

    if (completedModuleIds.length > 0) {
      recommendedQuery = recommendedQuery.not('id', 'in', `(${completedModuleIds.join(',')})`);
    }

    const { data: recommendedModules } = await recommendedQuery;

    const { data: ecoActions } = await supabase
      .from('eco_actions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    const weeklyActivity = [65, 80, 45, 90, 75, 85, 60];

    const { data: recentProgress } = await supabase
      .from('progress')
      .select('*, modules(title)')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(3);

    const dashboardData = {
      user: req.user,
      recommendedModules: recommendedModules || [],
      ecoActions: ecoActions || [],
      weeklyActivity,
      recentAchievements: recentProgress || [],
      stats: {
        totalModules: userProgress?.length || 0,
        completedModules: completedModuleIds.length,
        averageScore: userProgress && userProgress.length > 0
          ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length)
          : 0
      }
    };

    res.json({
      success: true,
      message: 'Student dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error) {
    logger.error('Get student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student dashboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const getTeacherDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { data: students } = await supabase
      .from('users')
      .select('id, name, email, role, points, badges, created_at')
      .eq('role', 'student');

    const { data: allProgress } = await supabase
      .from('progress')
      .select(`
        *,
        users(name, email),
        modules(title)
      `);

    const classStats = {
      totalStudents: students?.length || 0,
      activeToday: Math.floor((students?.length || 0) * 0.85),
      averageScore: allProgress && allProgress.length > 0
        ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
        : 0,
      completionRate: allProgress && allProgress.length > 0
        ? Math.round((allProgress.filter(p => p.completed).length / allProgress.length) * 100)
        : 0
    };

    const studentProgress = students?.map(student => {
      const studentProgressData = allProgress?.filter(p =>
        p.user_id === student.id
      ) || [];

      return {
        id: student.id,
        name: student.name,
        points: student.points,
        weeklyActivity: Math.floor(Math.random() * 40) + 60,
        status: student.points > 2000 ? 'excellent' : student.points > 1000 ? 'good' : 'needs attention',
        modulesCompleted: studentProgressData.filter(p => p.completed).length,
        averageScore: studentProgressData.length > 0
          ? Math.round(studentProgressData.reduce((sum, p) => sum + p.score, 0) / studentProgressData.length)
          : 0
      };
    }) || [];

    const recentAchievements = allProgress
      ?.filter(p => (p.badges_earned as any[])?.length > 0)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
      .map(p => ({
        student: (p.users as any)?.name || 'Unknown',
        badge: (p.badges_earned as any[])[0],
        time: p.timestamp
      })) || [];

    const dashboardData = {
      classStats,
      studentProgress,
      recentAchievements
    };

    res.json({
      success: true,
      message: 'Teacher dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error) {
    logger.error('Get teacher dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve teacher dashboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const getParentDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { data: children } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'student')
      .limit(2);

    const childrenData = await Promise.all((children || []).map(async (child) => {
      const { data: progress } = await supabase
        .from('progress')
        .select('*, modules(title)')
        .eq('user_id', child.id)
        .order('timestamp', { ascending: false });

      const { data: ecoActions } = await supabase
        .from('eco_actions')
        .select('*')
        .eq('user_id', child.id)
        .order('created_at', { ascending: false })
        .limit(3);

      return {
        id: child.id,
        name: child.name,
        points: child.points,
        weeklyGoal: 5,
        weeklyProgress: Math.floor(Math.random() * 3) + 2,
        totalTime: `${Math.floor(Math.random() * 10) + 8}h ${Math.floor(Math.random() * 60)}m`,
        modulesCompleted: progress?.filter(p => p.completed).length || 0,
        averageScore: progress && progress.length > 0
          ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
          : 0,
        recentBadges: (child.badges as string[] || []).slice(-3).map(badge => ({
          name: badge,
          icon: '🏆',
          earnedDate: 'Recently'
        })),
        weeklyActivity: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 40),
        recentModules: (progress || []).slice(0, 3).map(p => ({
          name: (p.modules as any)?.title || 'Unknown Module',
          score: p.score,
          completedDate: new Date(p.timestamp).toLocaleDateString(),
          timeSpent: '15 min'
        })),
        ecoActions: (ecoActions || []).map(action => ({
          action: action.action_type,
          points: action.points_earned,
          date: new Date(action.created_at).toLocaleDateString()
        }))
      };
    }));

    res.json({
      success: true,
      message: 'Parent dashboard data retrieved successfully',
      data: { children: childrenData }
    });
  } catch (error) {
    logger.error('Get parent dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve parent dashboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
