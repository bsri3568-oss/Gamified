import { Request, Response } from 'express';
import User from '../models/User';
import Module from '../models/Module';
import Progress from '../models/Progress';
import EcoAction from '../models/EcoAction';
import { AuthRequest } from '../types';
import logger from '../utils/logger';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;
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
    const userId = req.user!._id;

    // Get user progress
    const userProgress = await Progress.find({ userId }).populate('moduleId');
    const completedModuleIds = userProgress.filter(p => p.completed).map(p => p.moduleId);

    // Get recommended modules (not completed or low scores)
    const recommendedModules = await Module.find({
      _id: { $nin: completedModuleIds }
    }).limit(6);

    // Get recent eco actions
    const ecoActions = await EcoAction.find({ userId }).sort({ createdAt: -1 }).limit(5);

    // Calculate weekly activity (mock data for now)
    const weeklyActivity = [65, 80, 45, 90, 75, 85, 60];

    // Get recent achievements
    const recentProgress = await Progress.find({ userId })
      .populate('moduleId', 'title')
      .sort({ timestamp: -1 })
      .limit(3);

    const dashboardData = {
      user: req.user,
      recommendedModules,
      ecoActions,
      weeklyActivity,
      recentAchievements: recentProgress,
      stats: {
        totalModules: userProgress.length,
        completedModules: completedModuleIds.length,
        averageScore: userProgress.length > 0 
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
    // Get all students
    const students = await User.find({ role: 'student' }).select('-passwordHash');
    
    // Get all progress data
    const allProgress = await Progress.find({})
      .populate('userId', 'name email')
      .populate('moduleId', 'title category');

    // Calculate class statistics
    const classStats = {
      totalStudents: students.length,
      activeToday: Math.floor(students.length * 0.85), // Mock data
      averageScore: allProgress.length > 0 
        ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
        : 0,
      completionRate: allProgress.length > 0 
        ? Math.round((allProgress.filter(p => p.completed).length / allProgress.length) * 100)
        : 0
    };

    // Get student progress summary
    const studentProgress = students.map(student => {
      const studentProgressData = allProgress.filter(p => 
        p.userId && p.userId._id.toString() === student._id.toString()
      );
      
      return {
        id: student._id,
        name: student.name,
        level: student.level,
        points: student.points,
        weeklyActivity: Math.floor(Math.random() * 40) + 60, // Mock data
        status: student.points > 2000 ? 'excellent' : student.points > 1000 ? 'good' : 'needs attention',
        modulesCompleted: studentProgressData.filter(p => p.completed).length,
        averageScore: studentProgressData.length > 0 
          ? Math.round(studentProgressData.reduce((sum, p) => sum + p.score, 0) / studentProgressData.length)
          : 0
      };
    });

    const dashboardData = {
      classStats,
      studentProgress,
      recentAchievements: allProgress
        .filter(p => p.badgesEarned.length > 0)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5)
        .map(p => ({
          student: p.userId ? (p.userId as any).name : 'Unknown',
          badge: p.badgesEarned[0],
          time: p.timestamp
        }))
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
    // For demo purposes, get all students (in real app, would be parent's children)
    const children = await User.find({ role: 'student' }).select('-passwordHash').limit(2);
    
    const childrenData = await Promise.all(children.map(async (child) => {
      const progress = await Progress.find({ userId: child._id })
        .populate('moduleId', 'title')
        .sort({ timestamp: -1 });
      
      const ecoActions = await EcoAction.find({ userId: child._id })
        .sort({ createdAt: -1 })
        .limit(3);

      return {
        id: child._id,
        name: child.name,
        level: child.level,
        points: child.points,
        streak: child.streak,
        weeklyGoal: 5,
        weeklyProgress: Math.floor(Math.random() * 3) + 2,
        totalTime: `${Math.floor(Math.random() * 10) + 8}h ${Math.floor(Math.random() * 60)}m`,
        modulesCompleted: progress.filter(p => p.completed).length,
        averageScore: progress.length > 0 
          ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
          : 0,
        recentBadges: child.badges.slice(-3).map(badge => ({
          name: badge,
          icon: '🏆',
          earnedDate: 'Recently'
        })),
        weeklyActivity: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 40),
        recentModules: progress.slice(0, 3).map(p => ({
          name: p.moduleId ? (p.moduleId as any).title : 'Unknown Module',
          score: p.score,
          completedDate: p.timestamp.toLocaleDateString(),
          timeSpent: `${Math.floor(p.timeSpent / 60)} min`
        })),
        ecoActions: ecoActions.map(action => ({
          action: action.title,
          points: action.points,
          date: action.completedDate ? action.completedDate.toLocaleDateString() : 'Pending'
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