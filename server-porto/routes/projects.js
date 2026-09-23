import express from 'express';

import { getAllProjects, createProject, deleteProject, updateProject } from '../controller/project.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/create', verifyToken, requireAdmin, createProject);
router.delete('/delete/:id', verifyToken, requireAdmin, deleteProject);
router.put('/update/:id', verifyToken, requireAdmin, updateProject);

export default router;