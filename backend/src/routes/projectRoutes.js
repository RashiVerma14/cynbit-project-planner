import express from 'express';
import { submitProjectInquiry, getProjectDetails } from '../controllers/projectController.js';
import { validateProjectSubmission } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', validateProjectSubmission, submitProjectInquiry);
router.get('/:id', getProjectDetails);

export default router;
