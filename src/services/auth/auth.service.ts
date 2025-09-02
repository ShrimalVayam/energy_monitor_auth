import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';
import { key } from '../../utils/constants';
import { CustomError } from '../../utils/error';

interface SigninInput {
  email: string;
  password: string;
}

export class AuthService {
  static async signinService({ email, password }: SigninInput) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      logger.warn(`Signin failed: User not found (${email})`);
      throw new CustomError('Invalid credentials', 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      logger.warn(`Signin failed: Invalid password for ${email}`);
      throw new CustomError('Invalid credentials', 400);
    }

    const token = jwt.sign({ userId: user.id, email }, key, {
      expiresIn: '1d',
    });

    logger.info(`User logged in: ${user.id} (${email})`);

    return {
      message: 'User logged in successfully!',
      token,
    };
  }
}
