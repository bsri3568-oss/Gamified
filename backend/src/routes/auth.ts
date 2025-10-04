import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { validateRegistration, validateLogin, handleValidationErrors } from '../middlewares/validation';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, handleValidationErrors, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, login);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, getProfile);

export default router;