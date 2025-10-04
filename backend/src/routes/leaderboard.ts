import express from 'express';
import { getLeaderboard, getUserRank } from '../controllers/leaderboardController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// @route   GET /api/leaderboard
// @desc    Get leaderboard
// @access  Private
router.get('/', authenticate, getLeaderboard);

// @route   GET /api/leaderboard/rank/:userId
// @desc    Get user's rank
// @access  Private
router.get('/rank/:userId', authenticate, getUserRank);

export default router;