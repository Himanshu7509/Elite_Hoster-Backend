import express from 'express';
import { 
  registerEmployee, 
  loginUser, 
  getUserProfile, 
  adminLogin 
} from '../controllers/auth.controller.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

// Employee routes
router.route('/register').post(registerEmployee);
router.route('/login').post(loginUser);

// Admin routes
router.route('/admin/login').post(adminLogin);

// Profile route (protected)
router.route('/profile').get(protect, getUserProfile);

export default router;