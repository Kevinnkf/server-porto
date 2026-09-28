import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../models/index.js';

dotenv.config();

const requiredVariables = ['ADMIN_EMAIL', 'ADMIN_USERNAME', 'ADMIN_NAME', 'ADMIN_PASSWORD'];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length) {
  console.error(`Set these environment variables before running: ${missingVariables.join(', ')}`);
  process.exitCode = 1;
} else {
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const username = process.env.ADMIN_USERNAME.trim();
  const name = process.env.ADMIN_NAME.trim();
  const password = process.env.ADMIN_PASSWORD;

  try {
    await db.sequelize.authenticate();
    await db.sequelize.transaction(async (transaction) => {
      const existingUser = await db.User.findOne({ where: { email }, transaction });
      if (existingUser) {
        const passwordMatches = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatches) {
          throw new Error('An account with this email already exists. Verify its password before promoting it.');
        }
        await existingUser.update({ role: 'admin' }, { transaction });
        console.log('Existing account verified and promoted to admin.');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await db.User.create({
        email,
        username,
        name,
        password: hashedPassword,
        role: 'admin'
      }, { transaction });
      console.log('Admin account created.');
    });
  } catch (error) {
    console.error('Admin bootstrap failed:', error.message);
    process.exitCode = 1;
  } finally {
    await db.sequelize.close();
  }
}
