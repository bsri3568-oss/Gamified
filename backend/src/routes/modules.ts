import express from 'express';
import { 
  getModules, 
  getModuleById, 
  submitQuiz, 
  getUserProgress 
} from '../controllers/moduleController';
import { authenticate } from '../middlewares/auth';
import { validateQuizSubmission, handleValidationErrors } from '../middlewares/validation';

const router = express.Router();

// @route   GET /api/modules
// @desc    Get all modules with optional filters
// @access  Private
router.get('/', authenticate, getModules);

// @route   GET /api/modules/:moduleId
// @desc    Get single module by ID
// @access  Private
router.get('/:moduleId', authenticate, getModuleById);

// @route   POST /api/modules/:moduleId/submit
// @desc    Submit quiz/module answers
// @access  Private
router.post('/:moduleId/submit', authenticate, validateQuizSubmission, handleValidationErrors, submitQuiz);

// @route   GET /api/modules/user/progress
// @desc    Get user's progress on all modules
// @access  Private
router.get('/user/progress', authenticate, getUserProgress);

export default router;