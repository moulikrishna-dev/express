import express from 'express';
import protect from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js';

const router = express.Router();

// Authentication Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// User Routes
router.get('/', protect, userController.getAllUsers);
router.post('/', protect, userController.createUser);
router.get('/:id', protect, userController.getUser);
router.patch('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

export default router;