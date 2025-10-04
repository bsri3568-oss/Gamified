import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { limit = 10, role = 'student' } = req.query;
    
    const leaderboard = await User.find({ role })
      .select('name points level badges streak')
      .sort({ points: -1 })
      .limit(parseInt(limit as string));

    const leaderboardWithRank = leaderboard.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      points: user.points,
      level: user.level,
      badges: user.badges.length,
      streak: user.streak
    }));

    res.json({
      success: true,
      message: 'Leaderboard retrieved successfully',
      data: { leaderboard: leaderboardWithRank }
    });
  } catch (error) {
    logger.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getUserRank = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const rank = await User.countDocuments({
      role: user.role,
      points: { $gt: user.points }
    }) + 1;

    const totalUsers = await User.countDocuments({ role: user.role });

    res.json({
      success: true,
      message: 'User rank retrieved successfully',
      data: {
        rank,
        totalUsers,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    logger.error('Get user rank error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user rank',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};