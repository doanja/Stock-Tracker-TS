import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { envVariables } from '../server';

/**
 * function to get the authorization token from the request header
 * @param {Request} req the request header
 * @return {string | undefined} the token, or undefined
 */
const extractTokenFromHeader = (req: Request): string | undefined => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return undefined;
};

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  // extract the jwt token from the Authorization header
  const accessToken: string | undefined = extractTokenFromHeader(req);

  if (!accessToken) {
    res.status(401).json({ error: 'You need be logged in to access this url.' });
    return;
  }

  // try to verify the token and get data
  try {
    verify(accessToken, envVariables.accessSecret, (error, payload) => {
      if (error) return res.status(401).send(error);

      const decodedToken: any = payload;

      // refresh the token on every request by setting another 15m
      sign({ _id: decodedToken._id }, envVariables.accessSecret, { expiresIn: '15m' }, (error, accessToken) => {
        if (error) return res.status(401).send(error);

        res.setHeader('Authorization', <string>accessToken);

        req.accessToken = decodedToken;
        next();
      });
    });
  } catch (error) {
    res.status(401).send(error);
    return;
  }
};
