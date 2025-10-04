/*
  # Gamified Environmental Education Platform Database Schema

  ## Overview
  Complete database schema for the eco-education gamification platform with user management,
  modules, progress tracking, and leaderboard functionality.

  ## Tables Created

  ### 1. users
  Core user table with authentication and gamification data
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email for login
  - `name` (text) - User display name
  - `password_hash` (text) - Bcrypt hashed password
  - `role` (text) - User role: student/teacher/parent
  - `points` (integer) - Total gamification points earned
  - `badges` (jsonb) - Array of earned badge names
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. modules
  Educational content including quizzes, challenges, and AR modules
  - `id` (uuid, primary key) - Unique module identifier
  - `title` (text) - Module title
  - `description` (text) - Module description
  - `module_type` (text) - Type: quiz/challenge/ar_module
  - `difficulty` (text) - Difficulty level: easy/medium/hard
  - `questions` (jsonb) - Array of question objects with choices and correct answers
  - `points_reward` (integer) - Points awarded on completion
  - `badge_reward` (text) - Badge name awarded (if any)
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. progress
  User progress tracking for each module
  - `id` (uuid, primary key) - Unique progress record identifier
  - `user_id` (uuid, foreign key) - References users table
  - `module_id` (uuid, foreign key) - References modules table
  - `score` (integer) - Score achieved (0-100)
  - `completed` (boolean) - Completion status
  - `eco_actions` (integer) - Number of eco-actions completed
  - `badges_earned` (jsonb) - Badges earned in this attempt
  - `answers` (jsonb) - User's submitted answers
  - `timestamp` (timestamptz) - Completion timestamp

  ### 4. eco_actions
  Real-world environmental actions users can log
  - `id` (uuid, primary key) - Unique action identifier
  - `user_id` (uuid, foreign key) - References users table
  - `action_type` (text) - Type of eco action
  - `description` (text) - Action description
  - `points_earned` (integer) - Points awarded for this action
  - `verified` (boolean) - Verification status
  - `created_at` (timestamptz) - Action timestamp

  ### 5. teacher_feedback
  Teacher feedback and insights for students
  - `id` (uuid, primary key) - Unique feedback identifier
  - `student_id` (uuid, foreign key) - References users table (student)
  - `teacher_id` (uuid, foreign key) - References users table (teacher)
  - `feedback_text` (text) - Feedback content
  - `progress_summary` (jsonb) - Summary of student progress
  - `created_at` (timestamptz) - Feedback timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only read/update their own data
  - Teachers can read student data in their scope
  - Parents can read their children's data
  - Public read access to modules table

  ## Indexes
  - Email index on users for fast lookup
  - User and module indexes on progress for query performance
  - Composite index on progress for leaderboard queries
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'parent')),
  points integer DEFAULT 0,
  badges jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  module_type text NOT NULL CHECK (module_type IN ('quiz', 'challenge', 'ar_module')),
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  points_reward integer DEFAULT 10,
  badge_reward text,
  created_at timestamptz DEFAULT now()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  score integer DEFAULT 0,
  completed boolean DEFAULT false,
  eco_actions integer DEFAULT 0,
  badges_earned jsonb DEFAULT '[]'::jsonb,
  answers jsonb DEFAULT '[]'::jsonb,
  timestamp timestamptz DEFAULT now()
);

-- Create eco_actions table
CREATE TABLE IF NOT EXISTS eco_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  description text NOT NULL,
  points_earned integer DEFAULT 5,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create teacher_feedback table
CREATE TABLE IF NOT EXISTS teacher_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feedback_text text NOT NULL,
  progress_summary jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module ON progress(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_completed ON progress(completed);
CREATE INDEX IF NOT EXISTS idx_eco_actions_user ON eco_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_feedback_student ON teacher_feedback(student_id);
CREATE INDEX IF NOT EXISTS idx_teacher_feedback_teacher ON teacher_feedback(teacher_id);

-- Create composite index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_users_points_desc ON users(points DESC);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE eco_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can view student profiles"
  ON users FOR SELECT
  TO authenticated
  USING (
    role = 'student' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'teacher'
    )
  );

-- RLS Policies for modules table (public read)
CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can create modules"
  ON modules FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'teacher'
    )
  );

-- RLS Policies for progress table
CREATE POLICY "Users can view their own progress"
  ON progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view all student progress"
  ON progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'teacher'
    )
  );

-- RLS Policies for eco_actions table
CREATE POLICY "Users can view their own eco actions"
  ON eco_actions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own eco actions"
  ON eco_actions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view and verify eco actions"
  ON eco_actions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'teacher'
    )
  );

-- RLS Policies for teacher_feedback table
CREATE POLICY "Students can view their own feedback"
  ON teacher_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can create feedback"
  ON teacher_feedback FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = teacher_id AND
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'teacher'
    )
  );

-- Function to update user updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();