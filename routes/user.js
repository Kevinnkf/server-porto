import express from 'express'

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/user.js'
import { getAllSummaries, getSummaryById, createSummary, updateSummary, deleteSummary } from '../controller/summary.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.get('/summaries', getAllSummaries);
router.get('/:id', getUserById);
router.post('/summary', verifyToken, createSummary);
router.get('/:id/summary', getSummaryById);
router.put('/:id/summary', verifyToken, updateSummary);
router.delete('/:id/summary', verifyToken, deleteSummary);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;

