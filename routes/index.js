import express from 'express';
import projectRoutes from './projects.js';
import userRoutes from './user.js';
import experienceRoutes from './experiences.js';

const router = express.Router();

// public routes
router.use('/projects', projectRoutes);
router.use('/user', userRoutes);
router.use('/experiences', experienceRoutes);


export default router;
