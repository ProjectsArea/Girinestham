import express from 'express';
import { login, logout } from '../../controllers/admin/adminController.js';
import { verifyToken } from '../../controllers/admin/authController.js';
import { authenticateAdmin } from '../../middleware/adminAuth.js';

// Import role and user routes
import roleRoutes from './roleRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Get CSRF token
router.get('/csrf', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Authentication routes
router.post('/login', login);
router.get('/verify', authenticateAdmin, verifyToken);
router.post('/logout', authenticateAdmin, logout);

// Role management routes
router.use('/roles', roleRoutes);

// User management routes
router.use('/users', userRoutes);

export default router;
