import express from 'express';

import { getAllProjects, createProject, deleteProject, updateProject } from '../controller/project.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/create', verifyToken, createProject);
router.delete('/delete/:id', verifyToken, deleteProject);
router.put('/update/:id', verifyToken, updateProject);

export default router;