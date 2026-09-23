import express from 'express';
import {
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification
} from '../controller/certification.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCertifications);
router.get('/:id', getCertificationById);
router.post('/create', verifyToken, requireAdmin, createCertification);
router.put('/update/:id', verifyToken, requireAdmin, updateCertification);
router.delete('/delete/:id', verifyToken, requireAdmin, deleteCertification);

export default router;
