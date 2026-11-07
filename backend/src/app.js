import express from 'express';
import { configureCors } from './config/cors.js';
import { getDBStatus } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import estimationRoutes from './routes/estimationRoutes.js';
import blueprintRoutes from './routes/blueprintRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middleware
app.use(configureCors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Cynbit Project Planner API',
    database: getDBStatus(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/projects/estimate', estimationRoutes);
app.use('/api/projects', blueprintRoutes);
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Fallback handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

