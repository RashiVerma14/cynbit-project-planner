import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      default: 'Cynbit Lead Architect'
    },
    role: {
      type: String,
      enum: ['ROLE_ADMIN'],
      default: 'ROLE_ADMIN'
    }
  },
  {
    timestamps: true
  }
);

adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

export const AdminUser = mongoose.model('AdminUser', adminUserSchema);
