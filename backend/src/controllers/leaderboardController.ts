import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import logger from '../utils/logger';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { limit = 10, role = 'student' } = req.query;

    const { data: leaderboard, error } = await supabase
      .from('users')
      .select('id, name, points, badges')
      .eq('role', role)
      .order('points', { ascending: false })
      .limit(parseInt(limit as string));

    if (error) throw error;

    const leaderboardWithRank = leaderboard?.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      points: user.points,
      badges: (user.badges as string[] || []).length
    })) || [];

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

    const { count: higherRankedCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', user.role)
      .gt('points', user.points);

    const rank = (higherRankedCount || 0) + 1;

    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', user.role);

    res.json({
      success: true,
      message: 'User rank retrieved successfully',
      data: {
        rank,
        totalUsers: totalUsers || 0,
        points: user.points
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
