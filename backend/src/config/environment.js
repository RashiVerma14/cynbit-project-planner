import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cynbit_project_planner',
  jwtSecret: process.env.JWT_SECRET || 'cynbit_production_jwt_secret_key_2026_intern_assessment',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  groqApiKey: process.env.GROQ_API_KEY || '',
  groqModel: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
