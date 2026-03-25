import express from 'express';
import { getAllSummaries, getSummaryById, createSummary, updateSummary, deleteSummary } from '../controller/summary.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSummaries);
router.get('/:id', getSummaryById);
router.post('/create', verifyToken, createSummary);
router.put('/update/:id', verifyToken, updateSummary);
router.delete('/delete/:id', verifyToken, deleteSummary);

export default router;