import app from './app.js';
import { config } from './config/environment.js';
import { connectDB } from './config/db.js';
import { seedSampleInquiriesIfEmpty } from './services/projectService.js';

const startServer = async () => {
  // Connect database
  await connectDB();

  // Populate sample inquiries if empty for instant review
  seedSampleInquiriesIfEmpty();

  const server = app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`  CYNBIT PROJECT PLANNER BACKEND SERVICE`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  Listening on: http://localhost:${config.port}`);
    console.log(`  Health API:   http://localhost:${config.port}/api/health`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown
  const handleExit = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
      console.log('Process terminated.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleExit);
  process.on('SIGINT', handleExit);
};

startServer();
