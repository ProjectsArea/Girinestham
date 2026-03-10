import express from 'express';
import { login, logout } from '../../controllers/admin/authController.js';
import { verifyAdminToken } from '../../middleware/admin/adminAuth.js';

const router = express.Router();

// Authentication routes
router.post('/login', login);
router.post('/logout', verifyAdminToken, logout);


export default router;
