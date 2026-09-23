import express from 'express';

import { getAllExperiences, addExperience, editExperience, deleteExperience } from '../controller/experiences.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.post('/create', verifyToken, requireAdmin, addExperience);
router.delete('/delete/:id', verifyToken, requireAdmin, deleteExperience);
router.put('/update/:id', verifyToken, requireAdmin, editExperience);

export default router;