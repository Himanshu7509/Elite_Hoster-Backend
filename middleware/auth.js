import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import asyncHandler from 'express-async-handler';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

    // Get user from token and attach to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user || !req.user.isActive) {
      res.status(401);
      throw new Error('Not authorized, user not found or inactive');
    }

    next();
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin protection middleware
const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

    // Get user from token and attach to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user || !req.user.isActive) {
      res.status(401);
      throw new Error('Not authorized, user not found or inactive');
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized, admin access required');
    }

    next();
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect, adminProtect };