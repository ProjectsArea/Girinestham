import express from 'express';
import { createRole, getRoles, updateRole } from '../../controllers/admin/roleController.js';
import { authenticateAdmin } from '../../middleware/adminAuth.js';

const router = express.Router();

// All role routes are protected
router.post('/create', authenticateAdmin, createRole);
router.get('/', authenticateAdmin, getRoles);
router.put('/update', authenticateAdmin, updateRole);

export default router;
