import { supabase } from './supabase';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    logger.info('Supabase Connected Successfully');
  } catch (error) {
    logger.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;