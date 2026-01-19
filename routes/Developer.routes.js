import express from 'express';
import { 
  getCompanies, 
  getCompanyById 
} from '../controllers/Developer.controller.js';
import { protect } from '../middleware/auth.js';

// Custom middleware to check if user is developer
const developerProtect = (req, res, next) => {
  if (req.user && req.user.role === 'developer') {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: 'Access denied. Developer access required.' 
    });
  }
};

const router = express.Router();

// All developer routes require developer role
router.route('/companies')
  .get(developerProtect, getCompanies);

router.route('/companies/:id')
  .get(developerProtect, getCompanyById);

export default router;