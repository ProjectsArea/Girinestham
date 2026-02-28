import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../../controllers/admin/userController.js';
import { authenticateAdmin } from '../../middleware/adminAuth.js';

const router = express.Router();

// All user routes are protected
router.post('/create', authenticateAdmin, createUser);
router.get('/', authenticateAdmin, getUsers);
router.put('/update', authenticateAdmin, updateUser);
router.delete('/:id', authenticateAdmin, deleteUser);

export default router;
