import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error('[FATAL CONFIG ERROR] JWT_SECRET environment variable is strictly required in production!');
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cynbit_project_planner',
  jwtSecret: process.env.JWT_SECRET || (isProduction ? undefined : 'cynbit_dev_jwt_secret_key_assessment_only'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  groqApiKey: process.env.GROQ_API_KEY || '',
  groqModel: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
