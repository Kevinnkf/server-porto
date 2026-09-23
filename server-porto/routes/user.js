import express from 'express'

import { getAllUsers, createUser, updateUser, deleteUser } from '../controller/user.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;

