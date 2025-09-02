import { Request } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import logger from '../../utils/logger';

export class AuthController {
  static async userSigninController(req: Request) {
    const { email, password } = req.body;

    logger.info(`Signin attempt for email: ${email}`);
    const result = await AuthService.signinService({ email, password });

    return result;
  }
}
