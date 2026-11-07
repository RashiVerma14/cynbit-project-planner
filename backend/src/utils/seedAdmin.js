import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/environment.js';
import { AdminUser } from '../models/AdminUser.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected for admin seeding.');

    const adminEmail = 'admin@cynbit.in';
    const existing = await AdminUser.findOne({ email: adminEmail });

    if (existing) {
      console.log(`Admin account ${adminEmail} already exists in database.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('CynbitAdmin@2026', salt);

      await AdminUser.create({
        email: adminEmail,
        passwordHash,
        fullName: 'Cynbit Lead Architect',
        role: 'ROLE_ADMIN'
      });
      console.log(`Admin account successfully provisioned: ${adminEmail} / CynbitAdmin@2026`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Admin seeding failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();

