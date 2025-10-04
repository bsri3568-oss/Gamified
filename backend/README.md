# Gamified Environmental Education Platform - Backend API

A comprehensive REST API for the Gamified Environmental Education Platform built with Node.js, Express.js, TypeScript, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Support for students, teachers, and parents
- **Gamification Engine**: Points, badges, levels, and leaderboards
- **Learning Modules**: Interactive quizzes, challenges, and eco-missions
- **Progress Tracking**: Detailed analytics and reporting
- **Dashboard APIs**: Role-specific dashboard data
- **Security**: Rate limiting, input validation, and secure password hashing

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Logging**: Winston
- **Testing**: Jest & Supertest

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/gamified-eco-education
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Seed the database**:
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Modules & Learning
- `GET /api/modules` - Get all modules with filters
- `GET /api/modules/:id` - Get specific module
- `POST /api/modules/:id/submit` - Submit quiz/challenge
- `GET /api/modules/user/progress` - Get user progress

### Dashboard
- `GET /api/dashboard` - Get role-specific dashboard data

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/leaderboard/rank/:userId` - Get user rank

## Data Models

### User
```typescript
{
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'teacher' | 'parent';
  points: number;
  level: number;
  badges: string[];
  streak: number;
}
```

### Module
```typescript
{
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  moduleType: 'quiz' | 'challenge' | 'simulation' | 'eco-mission';
  points: number;
  questions: Question[];
}
```

### Progress
```typescript
{
  userId: ObjectId;
  moduleId: ObjectId;
  score: number;
  completed: boolean;
  answers: number[];
  badgesEarned: string[];
  timeSpent: number;
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## Sample API Calls

### Register a new student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@student.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@student.com",
    "password": "password123"
  }'
```

### Get modules (with token)
```bash
curl -X GET http://localhost:5000/api/modules \
  -H "Authorization: Bearer <your-token>"
```

### Submit a quiz
```bash
curl -X POST http://localhost:5000/api/modules/MODULE_ID/submit \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [1, 0, 2],
    "timeSpent": 300
  }'
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

### Project Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server file
├── logs/                # Application logs
├── dist/                # Compiled JavaScript (after build)
└── package.json
```

## Testing

Run the test suite:

```bash
npm test
```

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://your-frontend-domain.com
```

### Build and Deploy

```bash
npm run build
npm start
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Role-based Access**: Different permissions for user roles

## Logging

The application uses Winston for logging:
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`
- Console output in development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details