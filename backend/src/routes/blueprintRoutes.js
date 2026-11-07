import express from 'express';
import { regenerateBlueprint } from '../controllers/blueprintController.js';

const router = express.Router();

router.post('/:id/blueprint', regenerateBlueprint);

export default router;

