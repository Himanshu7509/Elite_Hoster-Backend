import express from 'express';
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/User.controller.js';
import { adminProtect } from '../middleware/auth.js';

const router = express.Router();

// All user routes require admin protection
router.route('/')
  .get(adminProtect, getUsers);

router.route('/:id')
  .get(adminProtect, getUserById)
  .put(adminProtect, updateUser)
  .delete(adminProtect, deleteUser);

export default router;