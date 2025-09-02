import express from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';
import { validateBody } from '../../middlewares/validatejoi.middleware';
import { userSigninSchema } from '../../utils/validation/auth.schema';
import { responseHandler } from '../../utils/responseHandler';

const authRouter = express.Router();

authRouter.post(
  '/user/login',
  validateBody(userSigninSchema),
  responseHandler(AuthController.userSigninController)
);

export default authRouter;
