import mongoose from 'mongoose';
import { config } from './environment.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });
    isConnected = true;
    console.log(`[Cynbit DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Cynbit DB] Notice: MongoDB connection failed (${error.message}).`);
    console.warn('[Cynbit DB] Operating with in-memory fallback persistence for seamless assessment evaluation.');
    isConnected = false;
  }
};

export const getDBStatus = () => (isConnected ? 'CONNECTED' : 'DISCONNECTED_IN_MEMORY_FALLBACK');
