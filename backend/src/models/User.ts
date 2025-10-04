import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'parent'],
    required: [true, 'Role is required']
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  level: {
    type: Number,
    default: 1,
    min: [1, 'Level must be at least 1']
  },
  badges: [{
    type: String,
    trim: true
  }],
  streak: {
    type: Number,
    default: 0,
    min: [0, 'Streak cannot be negative']
  },
  avatar: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  }
});

// Index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ points: -1 });
UserSchema.index({ role: 1 });

export default mongoose.model<IUser>('User', UserSchema);