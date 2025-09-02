import { Request } from 'express';
import { UserService } from '../../services/user/user.service';
import logger from '../../utils/logger';

export class UserController {
  static async userSignupController(req: Request) {
    const { username, email, password } = req.body;

    logger.info(`Signup attempt for email: ${email}`);
    const result = await UserService.userSignupService({
      username,
      email,
      password,
    });

    return result;
  }
}
