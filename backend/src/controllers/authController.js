import { AdminUser } from '../models/AdminUser.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide both email and password.', 400);
    }

    // Default internal demo credential verification for assessment
    if (email === 'admin@cynbit.in' && password === 'CynbitAdmin@2026') {
      const demoToken = generateToken({
        id: 'cynbit_admin_root',
        email: 'admin@cynbit.in',
        role: 'ROLE_ADMIN'
      });

      return successResponse(
        res,
        {
          token: demoToken,
          user: {
            email: 'admin@cynbit.in',
            fullName: 'Cynbit Lead Architect',
            role: 'ROLE_ADMIN'
          }
        },
        'Authentication successful.'
      );
    }

    // Check DB for registered admin
    try {
      const admin = await AdminUser.findOne({ email: email.toLowerCase() });
      if (admin && (await admin.matchPassword(password))) {
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
              email: admin.email,
              fullName: admin.fullName,
              role: admin.role
            }
          },
          'Authentication successful.'
        );
      }
    } catch (dbErr) {}

    return errorResponse(res, 'Invalid credentials. Please verify your email and password.', 401);
  } catch (error) {
    next(error);
  }
};

