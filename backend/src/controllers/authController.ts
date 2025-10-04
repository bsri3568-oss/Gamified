import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';
import { RegisterRequest, LoginRequest, ApiResponse } from '../types';
import logger from '../utils/logger';

export const register = async (req: Request<{}, ApiResponse, RegisterRequest>, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = new User({
      name,
      email,
      passwordHash,
      role,
      points: role === 'student' ? 100 : 0, // Welcome bonus for students
      level: 1,
      badges: role === 'student' ? ['Welcome'] : [],
      streak: 0
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    logger.info(`New user registered: ${email} as ${role}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          points: user.points,
          level: user.level,
          badges: user.badges,
          streak: user.streak
        }
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const login = async (req: Request<{}, ApiResponse, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    logger.info(`User logged in: ${email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          points: user.points,
          level: user.level,
          badges: user.badges,
          streak: user.streak
        }
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: { user }
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};