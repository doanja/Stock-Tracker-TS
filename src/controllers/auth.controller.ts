import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { User } from '../models';
import { IUser } from '../@types';
import { verifyRefreshToken, signRefreshToken, deleteRefreshToken, signAccessToken } from '../helpers/jwt';

export const initSignupStrategy = (): Strategy => {
  return new Strategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (error, user: IUser) => {
      if (error) return done(error);

      if (user) return done(null, false, { message: 'That email is already taken.' });
      else {
        const newUser = { email, password: hashSync(password, genSaltSync(8)) };
        User.create(newUser);

        return done(null, newUser);
      }
    });
  });
};

export const initLoginStrategy = (): Strategy => {
  return new Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (error, user: IUser) => {
      if (error) return done(error);

      if (!user) return done(null, false, { message: 'That email is not found.' });

      if (!compareSync(password, user.password)) return done(null, false, { message: 'The password is incorrect.' });

      return done(null, user);
    });
  });
};

export const signup = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local-signup', { session: false }, (error, user, info) => {
    if (!user || error) return res.status(400).json({ error: info });

    return res.status(200).json(user);
  })(req, res, next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-login', { session: false }, (error, user, info) => {
    if (!user || error) return res.status(400).json({ error: info });

    // generate a signed son web token with the contents of user _id and return it in the response
    req.login(user, { session: false }, async () => {
      const refreshToken: string = await signRefreshToken(user._id.toString());
      const accessToken = (await signAccessToken(user._id)) as AccessToken;

      return res.status(200).json({ refreshToken, accessToken });
    });
  })(req, res, next);
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) res.status(401);

    const check = await deleteRefreshToken(refreshToken);

    check ? res.status(201).json({ message: 'Logout success' }) : res.status(401).json({ error: 'Logout unsuccessful' });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) res.status(401);

    const userId: string = await verifyRefreshToken(refreshToken);
    const token: string = await signRefreshToken(userId);

    res.status(201).json({ refreshToken: token });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) res.status(401);

    const userId: string = await verifyRefreshToken(refreshToken);
    const accessToken = (await signAccessToken(userId)) as AccessToken;

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(401).json(error);
  }
};
