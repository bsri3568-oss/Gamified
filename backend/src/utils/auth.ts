import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const calculateLevel = (points: number): number => {
  // Level calculation: every 500 points = 1 level
  return Math.floor(points / 500) + 1;
};

export const calculateBadges = (score: number, moduleType: string, streak: number): string[] => {
  const badges: string[] = [];
  
  // Score-based badges
  if (score === 100) badges.push('Perfect Score');
  else if (score >= 90) badges.push('Excellence');
  else if (score >= 80) badges.push('Great Job');
  
  // Module-type badges
  if (moduleType === 'quiz' && score >= 85) badges.push('Quiz Master');
  if (moduleType === 'eco-mission' && score >= 80) badges.push('Eco Warrior');
  if (moduleType === 'challenge' && score >= 85) badges.push('Challenge Champion');
  
  // Streak badges
  if (streak >= 7) badges.push('Week Warrior');
  if (streak >= 30) badges.push('Monthly Master');
  
  return badges;
};