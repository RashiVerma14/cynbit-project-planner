import express from 'express';
import { calculateEstimatePreview } from '../controllers/estimationController.js';
import { validateEstimationRequest } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', validateEstimationRequest, calculateEstimatePreview);

export default router;
