import { sign, verify } from 'jsonwebtoken';
import createError from 'http-errors';
import { client } from '../server';
import { envVariables } from '../server';

/**
 * function to sign a refresh token, store it in Redis
 * @param {string} payload the user's ID
 * @return {string} a new refresh token
 */
export const signRefreshToken = (payload: string): Promise<string> => {
  const expiresIn = 86400;

  return new Promise((resolve, reject) => {
    sign({ _id: payload }, envVariables.refreshSecret, { expiresIn }, (error, refreshToken: any) => {
      if (error) {
        reject(createError(500, 'Internal Server Error'));
      }

      client.set(payload, refreshToken, (error, reply) => {
        if (error) {
          reject(createError(500, 'Internal Server Error'));
          return;
        }
        client.expire(payload, expiresIn);
        resolve(refreshToken);
      });
    });
  });
};

/**
 * function to verify the refresh token and compares it the one in Redis
 * @param {string} refreshToken the refreshToken
 * @return {string} the user's ID
 */
export const verifyRefreshToken = (refreshToken: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    verify(refreshToken, envVariables.refreshSecret, (error, payload: any) => {
      if (error) {
        return reject(createError(401, 'Unathorized'));
      }
      const userId = payload._id;
      client.get(userId, (error, result) => {
        if (error) {
          reject(createError(500, 'Internal Server Error'));
          return;
        }

        // check refreshToken vs. the refreshToken in memory
        if (refreshToken === result) return resolve(userId);

        reject(createError(401, 'Unathorized'));
      });
    });
  });
};

/**
 * function to delete the user's refreshToken from redis
 * @param {string} refreshToken the refreshToken
 * @return {boolean} true if the key was deleted
 */
export const deleteRefreshToken = (refreshToken: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    verify(refreshToken, envVariables.refreshSecret, (error, payload: any) => {
      if (error) {
        return reject(createError(401, 'Unathorized'));
      }
      const userId = payload._id;
      client.del(userId, (error, result) => {
        if (error) {
          reject(createError(500, 'Internal Server Error'));
          return;
        }

        //  key was deleted
        return resolve(true);
      });
    });
  });
};

/**
 * function to sign a access token
 * @param {string} payload the user's ID
 * @return {string} an access token
 */
export const signAccessToken = async (payload: string) => {
  const expiresIn = '15m';

  return new Promise((resolve, reject) => {
    sign({ _id: payload }, envVariables.accessSecret, { expiresIn }, (error, accessToken) => {
      if (error) {
        reject(createError(500, 'Internal Server Error'));
        return;
      }
      resolve(accessToken);
    });
  });
};
