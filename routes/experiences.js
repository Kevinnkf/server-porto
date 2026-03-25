import express from 'express';

import { getAllExperiences, addExperience, editExperience, deleteExperience } from '../controller/experiences.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.post('/create', verifyToken, addExperience);
router.delete('/delete/:id', verifyToken, deleteExperience);
router.put('/update/:id', verifyToken, editExperience);

export default router;