import express from 'express';
import { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill } from '../controller/skill.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/create', verifyToken, createSkill);
router.put('/update/:id', verifyToken, updateSkill);
router.delete('/delete/:id', verifyToken, deleteSkill);

export default router;
