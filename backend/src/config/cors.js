import cors from 'cors';
import { config } from './environment.js';

export const configureCors = () => {
  const allowedOrigins = config.corsOrigin === '*' 
    ? '*' 
    : config.corsOrigin.split(',').map((o) => o.trim());

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
  });
};
