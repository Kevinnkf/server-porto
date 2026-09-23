import express from 'express';
import summaryRoutes from './summary.js';
import projectRoutes from './projects.js';
import userRoutes from './user.js';
import experienceRoutes from './experiences.js';
import certificationRoutes from './certifications.js';

const router = express.Router();

// public routes
router.use('/summary', summaryRoutes);
router.use('/projects', projectRoutes);
router.use('/user', userRoutes);
router.use('/experiences', experienceRoutes);
router.use('/certifications', certificationRoutes);

export default router;
