import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';
import { AdminUser } from '../models/AdminUser.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Missing bearer authorization token.'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await AdminUser.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Admin account no longer exists.'
      });
    }

    req.admin = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Token signature invalid or expired.'
    });
  }
};
