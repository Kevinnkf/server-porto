import express from 'express';
import { getAllSummaries, getSummaryById, createSummary, updateSummary, deleteSummary } from '../controller/summary.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSummaries);
router.get('/:id', getSummaryById);
router.post('/create', verifyToken, requireAdmin, createSummary);
router.put('/update/:id', verifyToken, requireAdmin, updateSummary);
router.delete('/delete/:id', verifyToken, requireAdmin, deleteSummary);

export default router;