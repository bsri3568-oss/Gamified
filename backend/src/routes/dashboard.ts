import express from 'express';
import { getDashboard } from '../controllers/dashboardController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard data based on user role
// @access  Private
router.get('/', authenticate, getDashboard);

export default router;