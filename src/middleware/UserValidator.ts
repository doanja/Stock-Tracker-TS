import { Request, Response, NextFunction } from 'express';
import { string } from 'yup';

export default class UserValidator {
  private passwordSchema: any;
  private emailSchema: any;

  constructor() {
    this.passwordSchema = this.initPasswordSchema();
    this.emailSchema = this.initEmailSchema();
  }

  private initPasswordSchema = () => string().min(8).max(32).required();

  private initEmailSchema = () => string().required().email();

  public validateNewPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordSchema.validate(req.body.newPassword);
      next();
    } catch (err) {
      return res.status(400).json({ error: `${err.name}: ${err.message}.` });
    }
  };

  public validateNewEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.emailSchema.validate(req.body.newEmail);
      next();
    } catch (err) {
      return res.status(400).json({ error: `${err.name}: ${err.message}.` });
    }
  };

  public validatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.passwordSchema.validate(req.body.password);

      next();
    } catch (err) {
      return res.status(400).json({ error: `${err.name}: ${err.message}.` });
    }
  };

  public validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.emailSchema.validate(req.body.email);
      next();
    } catch (err) {
      return res.status(400).json({ error: `${err.name}: ${err.message}.` });
    }
  };
}
