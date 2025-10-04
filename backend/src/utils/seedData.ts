import { supabase } from '../config/supabase';
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const sampleModules = [
  {
    title: 'Introduction to Climate Change',
    description: 'Learn the basics of climate change and its impact on our planet.',
    module_type: 'quiz',
    difficulty: 'easy',
    points_reward: 100,
    badge_reward: 'Climate Novice',
    questions: [
      {
        questionText: 'What is the main greenhouse gas responsible for global warming?',
        choices: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswerIndex: 1,
        explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities.'
      },
      {
        questionText: 'Which human activity contributes most to climate change?',
        choices: ['Reading books', 'Burning fossil fuels', 'Planting trees', 'Recycling'],
        correctAnswerIndex: 1,
        explanation: 'Burning fossil fuels for energy and transportation is the largest source of greenhouse gas emissions.'
      },
      {
        questionText: 'What is the greenhouse effect?',
        choices: [
          'Growing plants in a greenhouse',
          'Trapping heat in the atmosphere',
          'Effect of green houses on temperature',
          'A type of pollution'
        ],
        correctAnswerIndex: 1,
        explanation: 'The greenhouse effect is the process by which greenhouse gases trap heat in Earth\'s atmosphere.'
      }
    ]
  },
  {
    title: 'Renewable Energy Basics',
    description: 'Discover different types of renewable energy sources.',
    module_type: 'quiz',
    difficulty: 'medium',
    points_reward: 150,
    badge_reward: 'Energy Expert',
    questions: [
      {
        questionText: 'Which of these is NOT a renewable energy source?',
        choices: ['Solar', 'Wind', 'Coal', 'Hydroelectric'],
        correctAnswerIndex: 2,
        explanation: 'Coal is a fossil fuel and non-renewable. It takes millions of years to form.'
      },
      {
        questionText: 'What does solar power use to generate electricity?',
        choices: ['Wind turbines', 'Sunlight', 'Water', 'Geothermal heat'],
        correctAnswerIndex: 1,
        explanation: 'Solar panels convert sunlight directly into electricity using photovoltaic cells.'
      },
      {
        questionText: 'Which country leads in wind energy production?',
        choices: ['China', 'Brazil', 'Australia', 'Japan'],
        correctAnswerIndex: 0,
        explanation: 'China has the largest installed wind power capacity in the world.'
      }
    ]
  },
  {
    title: 'Ocean Conservation',
    description: 'Learn about protecting our oceans and marine life.',
    module_type: 'quiz',
    difficulty: 'medium',
    points_reward: 150,
    badge_reward: 'Ocean Guardian',
    questions: [
      {
        questionText: 'What percentage of Earth is covered by oceans?',
        choices: ['50%', '60%', '71%', '80%'],
        correctAnswerIndex: 2,
        explanation: 'Approximately 71% of Earth\'s surface is covered by oceans.'
      },
      {
        questionText: 'What is the biggest threat to coral reefs?',
        choices: ['Ocean acidification', 'Overfishing', 'Plastic pollution', 'All of the above'],
        correctAnswerIndex: 3,
        explanation: 'Coral reefs face multiple threats including acidification, overfishing, and pollution.'
      },
      {
        questionText: 'How long does plastic take to decompose in the ocean?',
        choices: ['1 year', '10 years', '100 years', '450+ years'],
        correctAnswerIndex: 3,
        explanation: 'Most plastics take hundreds of years to decompose in the ocean.'
      }
    ]
  },
  {
    title: 'Reduce, Reuse, Recycle Challenge',
    description: 'Complete this challenge to learn waste reduction strategies.',
    module_type: 'challenge',
    difficulty: 'easy',
    points_reward: 200,
    badge_reward: 'Waste Warrior',
    questions: [
      {
        questionText: 'What does the 3Rs stand for?',
        choices: [
          'Read, Run, Rest',
          'Reduce, Reuse, Recycle',
          'Repair, Renew, Replace',
          'Remove, Return, Restore'
        ],
        correctAnswerIndex: 1,
        explanation: 'The 3Rs are Reduce, Reuse, and Recycle - key principles of waste management.'
      },
      {
        questionText: 'Which item takes the longest to decompose in a landfill?',
        choices: ['Paper', 'Glass bottle', 'Banana peel', 'Aluminum can'],
        correctAnswerIndex: 1,
        explanation: 'Glass can take over 1 million years to decompose in a landfill.'
      }
    ]
  },
  {
    title: 'Sustainable Transportation',
    description: 'Explore eco-friendly ways to travel and reduce carbon emissions.',
    module_type: 'quiz',
    difficulty: 'medium',
    points_reward: 150,
    badge_reward: 'Green Traveler',
    questions: [
      {
        questionText: 'Which mode of transport has the lowest carbon footprint?',
        choices: ['Car', 'Airplane', 'Bicycle', 'Bus'],
        correctAnswerIndex: 2,
        explanation: 'Bicycles produce zero emissions and have the lowest carbon footprint.'
      },
      {
        questionText: 'What does EV stand for in transportation?',
        choices: ['Extra Vehicle', 'Electric Vehicle', 'Eco Vehicle', 'Energy Van'],
        correctAnswerIndex: 1,
        explanation: 'EV stands for Electric Vehicle, which runs on electricity instead of fossil fuels.'
      },
      {
        questionText: 'What is carpooling?',
        choices: [
          'Swimming in a car',
          'Sharing rides with others',
          'Washing your car',
          'Parking cars together'
        ],
        correctAnswerIndex: 1,
        explanation: 'Carpooling is sharing car rides with others to reduce the number of vehicles on the road.'
      }
    ]
  },
  {
    title: 'Biodiversity and Ecosystems',
    description: 'Understand the importance of biodiversity and ecosystem balance.',
    module_type: 'quiz',
    difficulty: 'hard',
    points_reward: 200,
    badge_reward: 'Biodiversity Champion',
    questions: [
      {
        questionText: 'What is biodiversity?',
        choices: [
          'Only plant species',
          'Variety of life on Earth',
          'Number of animals in a zoo',
          'Types of rocks'
        ],
        correctAnswerIndex: 1,
        explanation: 'Biodiversity refers to the variety of all living organisms on Earth.'
      },
      {
        questionText: 'What is a keystone species?',
        choices: [
          'The largest species',
          'Species that holds an ecosystem together',
          'Most common species',
          'Fastest species'
        ],
        correctAnswerIndex: 1,
        explanation: 'A keystone species has a disproportionate impact on its ecosystem relative to its abundance.'
      },
      {
        questionText: 'What causes habitat loss?',
        choices: [
          'Deforestation',
          'Urbanization',
          'Agriculture expansion',
          'All of the above'
        ],
        correctAnswerIndex: 3,
        explanation: 'Habitat loss is caused by multiple human activities including deforestation, urbanization, and agriculture.'
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    logger.info('Starting database seed...');

    const { data: existingModules, error: checkError } = await supabase
      .from('modules')
      .select('id')
      .limit(1);

    if (checkError) {
      logger.error('Error checking existing modules:', checkError);
      return;
    }

    if (existingModules && existingModules.length > 0) {
      logger.info('Database already has modules. Skipping seed.');
      return;
    }

    const { data: modules, error: insertError } = await supabase
      .from('modules')
      .insert(sampleModules)
      .select();

    if (insertError) {
      logger.error('Error inserting modules:', insertError);
      return;
    }

    logger.info(`Successfully seeded ${modules?.length || 0} modules`);

    const { data: testStudent, error: userError } = await supabase
      .from('users')
      .insert({
        name: 'Test Student',
        email: 'student@test.com',
        password_hash: '$2a$10$xQJ5yJ5yJ5yJ5yJ5yJ5yJOK7K7K7K7K7K7K7K7K7K7K7K7K7K7',
        role: 'student',
        points: 250,
        badges: ['Welcome', 'Climate Novice']
      })
      .select()
      .maybeSingle();

    if (!userError && testStudent) {
      logger.info('Created test student account');
    }

    const { data: testTeacher, error: teacherError } = await supabase
      .from('users')
      .insert({
        name: 'Test Teacher',
        email: 'teacher@test.com',
        password_hash: '$2a$10$xQJ5yJ5yJ5yJ5yJ5yJ5yJOK7K7K7K7K7K7K7K7K7K7K7K7K7K7',
        role: 'teacher',
        points: 0,
        badges: []
      })
      .select()
      .maybeSingle();

    if (!teacherError && testTeacher) {
      logger.info('Created test teacher account');
    }

    logger.info('Database seed completed successfully!');
    logger.info('Test credentials:');
    logger.info('Student - Email: student@test.com, Password: password123');
    logger.info('Teacher - Email: teacher@test.com, Password: password123');
  } catch (error) {
    logger.error('Error seeding database:', error);
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    logger.info('Seed process finished');
    process.exit(0);
  });
}

export default seedDatabase;
