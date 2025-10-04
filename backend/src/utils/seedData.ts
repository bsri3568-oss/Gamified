import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Module from '../models/Module';
import EcoAction from '../models/EcoAction';
import { hashPassword } from './auth';
import logger from './logger';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gamified-eco-education');
    logger.info('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Module.deleteMany({});
    await EcoAction.deleteMany({});
    logger.info('Cleared existing data');

    // Create sample users
    const users = [
      {
        name: 'Alex Chen',
        email: 'alex@student.com',
        passwordHash: await hashPassword('password123'),
        role: 'student',
        points: 2850,
        level: 12,
        badges: ['Welcome', 'Water Guardian', 'Green Warrior', 'Quiz Master'],
        streak: 7
      },
      {
        name: 'Emma Rodriguez',
        email: 'emma@student.com',
        passwordHash: await hashPassword('password123'),
        role: 'student',
        points: 2720,
        level: 11,
        badges: ['Welcome', 'Nature Explorer', 'Eco Warrior'],
        streak: 5
      },
      {
        name: 'Ms. Johnson',
        email: 'teacher@school.com',
        passwordHash: await hashPassword('password123'),
        role: 'teacher',
        points: 0,
        level: 1,
        badges: [],
        streak: 0
      },
      {
        name: 'Sarah Wilson',
        email: 'parent@family.com',
        passwordHash: await hashPassword('password123'),
        role: 'parent',
        points: 0,
        level: 1,
        badges: [],
        streak: 0
      }
    ];

    await User.insertMany(users);
    logger.info('Created sample users');

    // Create sample modules
    const modules = [
      {
        title: 'Ocean Pollution Crisis',
        description: 'Discover the impact of plastic waste on marine life and learn about solutions',
        category: 'Marine Biology',
        difficulty: 'intermediate',
        moduleType: 'quiz',
        points: 150,
        estimatedTime: '25 min',
        icon: '🌊',
        questions: [
          {
            questionText: 'What percentage of ocean plastic pollution comes from land-based sources?',
            choices: ['50%', '60%', '70%', '80%'],
            correctAnswerIndex: 3,
            explanation: 'Approximately 80% of ocean plastic pollution originates from land-based sources, including rivers, coastal activities, and improper waste management.'
          },
          {
            questionText: 'Which marine animal is most affected by plastic bag pollution?',
            choices: ['Dolphins', 'Sea turtles', 'Whales', 'Fish'],
            correctAnswerIndex: 1,
            explanation: 'Sea turtles often mistake plastic bags for jellyfish, their primary food source, leading to ingestion and potential death.'
          },
          {
            questionText: 'How long does it take for a plastic bottle to decompose in the ocean?',
            choices: ['50 years', '100 years', '450 years', '1000 years'],
            correctAnswerIndex: 2,
            explanation: 'Plastic bottles can take up to 450 years to decompose in marine environments, causing long-term pollution.'
          }
        ]
      },
      {
        title: 'Renewable Energy Heroes',
        description: 'Learn about solar, wind, and hydro power solutions for a sustainable future',
        category: 'Energy',
        difficulty: 'beginner',
        moduleType: 'quiz',
        points: 120,
        estimatedTime: '20 min',
        icon: '⚡',
        questions: [
          {
            questionText: 'Which renewable energy source is most widely used globally?',
            choices: ['Solar', 'Wind', 'Hydroelectric', 'Geothermal'],
            correctAnswerIndex: 2,
            explanation: 'Hydroelectric power is currently the most widely used renewable energy source, accounting for about 16% of global electricity generation.'
          },
          {
            questionText: 'What is the main advantage of solar panels?',
            choices: ['Low cost', 'No emissions', 'Easy installation', 'High efficiency'],
            correctAnswerIndex: 1,
            explanation: 'The main advantage of solar panels is that they produce electricity without any harmful emissions, making them environmentally friendly.'
          }
        ]
      },
      {
        title: 'Climate Change Detective',
        description: 'Investigate the causes and effects of global warming through interactive scenarios',
        category: 'Climate Science',
        difficulty: 'advanced',
        moduleType: 'challenge',
        points: 200,
        estimatedTime: '35 min',
        icon: '🔍',
        questions: [
          {
            questionText: 'What is the primary greenhouse gas responsible for climate change?',
            choices: ['Methane', 'Carbon dioxide', 'Nitrous oxide', 'Fluorinated gases'],
            correctAnswerIndex: 1,
            explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas, accounting for about 76% of total greenhouse gas emissions.'
          },
          {
            questionText: 'Which sector contributes most to global CO2 emissions?',
            choices: ['Transportation', 'Energy production', 'Agriculture', 'Industry'],
            correctAnswerIndex: 1,
            explanation: 'Energy production, including electricity and heat generation, is the largest source of CO2 emissions globally.'
          }
        ]
      },
      {
        title: 'Forest Conservation Quest',
        description: 'Explore the importance of forests and learn about conservation strategies',
        category: 'Conservation',
        difficulty: 'intermediate',
        moduleType: 'eco-mission',
        points: 180,
        estimatedTime: '30 min',
        icon: '🌳',
        questions: [
          {
            questionText: 'What percentage of the world\'s oxygen is produced by forests?',
            choices: ['10%', '20%', '28%', '35%'],
            correctAnswerIndex: 2,
            explanation: 'Forests produce approximately 28% of the world\'s oxygen, with the Amazon rainforest alone contributing about 20%.'
          },
          {
            questionText: 'Which is the most effective way to combat deforestation?',
            choices: ['Planting new trees', 'Sustainable logging', 'Protecting existing forests', 'Using alternatives to wood'],
            correctAnswerIndex: 2,
            explanation: 'Protecting existing forests is the most effective approach as mature forests store more carbon and support more biodiversity than newly planted trees.'
          }
        ]
      }
    ];

    await Module.insertMany(modules);
    logger.info('Created sample modules');

    // Create sample eco actions
    const ecoActions = [
      {
        userId: users[0]._id,
        title: 'Use reusable water bottle',
        description: 'Replace single-use plastic bottles with a reusable alternative',
        impact: 'Reduces plastic waste by 1,460 bottles per year',
        points: 15,
        completed: true,
        completedDate: new Date()
      },
      {
        userId: users[0]._id,
        title: 'Take shorter showers',
        description: 'Reduce shower time to conserve water',
        impact: 'Saves 25 gallons of water per week',
        points: 10,
        completed: true,
        completedDate: new Date(Date.now() - 86400000) // Yesterday
      },
      {
        userId: users[0]._id,
        title: 'Plant a tree (virtually)',
        description: 'Participate in virtual tree planting initiative',
        impact: 'Contributes to reforestation efforts',
        points: 25,
        completed: false
      }
    ];

    await EcoAction.insertMany(ecoActions);
    logger.info('Created sample eco actions');

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

export default seedData;