import { Router } from 'express';
import UserValidator from '../middleware/UserValidator';
import { verifyAccessToken } from '../middleware/verifyToken';
import { updatePassword, updateEmail } from '../controllers/user.controller';

export default class UserRoute {
  public router: Router = Router();
  private validator: UserValidator = new UserValidator();

  constructor() {
    this.router.put('/user/password', [verifyAccessToken, this.validator.validateNewPassword], updatePassword);
    this.router.put('/user/email', [verifyAccessToken, this.validator.validateNewEmail], updateEmail);
  }
}
