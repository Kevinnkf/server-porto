import express from 'express';
import { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill } from '../controller/skill.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/create', verifyToken, requireAdmin, createSkill);
router.put('/update/:id', verifyToken, requireAdmin, updateSkill);
router.delete('/delete/:id', verifyToken, requireAdmin, deleteSkill);

export default router;
