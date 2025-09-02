import bcrypt from 'bcryptjs';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';

interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  static async userSignupService(userData: SignupInput) {
    const { username, email, password } = userData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`Signup failed: Email already exists - ${email}`);
      throw new Error('Email already in use!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    logger.info(`User created: ${user.id} (${email})`);

    return { userId: user.id, message: 'User created successfully!' };
  }
}
