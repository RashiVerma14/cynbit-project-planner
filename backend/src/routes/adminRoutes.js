import express from 'express';
import { getAdminProjects, getAdminProjectById, updateInquiryStatus } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin); // Protect all admin endpoints with JWT

router.get('/projects', getAdminProjects);
router.get('/projects/:id', getAdminProjectById);
router.patch('/projects/:id/status', updateInquiryStatus);

export default router;
