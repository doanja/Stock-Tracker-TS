import { Router } from 'express';
import passport from 'passport';
import UserValidator from '../middleware/UserValidator';
import { signup, login, initSignupStrategy, initLoginStrategy, getRefreshToken, getAccessToken, logout } from '../controllers/auth.controller';

export default class AuthRoute {
  public router: Router = Router();
  private validator: UserValidator = new UserValidator();

  constructor() {
    this.initializeRoutes();
    this.initializeStrategies();
  }

  public initializeStrategies = () => {
    passport.use('local-signup', initSignupStrategy());
    passport.use('local-login', initLoginStrategy());

    return passport.initialize();
  };

  public initializeRoutes() {
    this.router.post('/signup', [this.validator.validatePassword, this.validator.validateEmail], signup);
    this.router.post('/login', [this.validator.validatePassword, this.validator.validateEmail], login);
    this.router.post('/refresh-token', getRefreshToken);
    this.router.post('/access-token', getAccessToken);
    this.router.post('/logout', logout);
  }
}
