import { AdminUser } from '../models/AdminUser.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide both email and password.', 400);
    }

    // Authenticate exclusively via MongoDB AdminUser model with bcrypt hash check
    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return errorResponse(res, 'Invalid credentials. User not found.', 401);
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials. Incorrect password.', 401);
    }

    const token = generateToken({
      id: admin._id,
      email: admin.email,
      role: admin.role
    });

    return successResponse(
      res,
      {
        token,
        user: {
          id: admin._id,
          email: admin.email,
          fullName: admin.fullName,
          role: admin.role
        }
      },
      'Authentication successful.'
    );
  } catch (error) {
    next(error);
  }
};
