import { decode } from 'jsonwebtoken';
import * as Yup from 'yup';

/**
 * function to check JWT expiration
 * @param {string} token the JWT
 * @return {boolean} true if token is valid, otherwise false
 */
export const checkTokenExp = (token: string) => {
  const decodedToken = decode(token, { complete: true }) as { [key: string]: any };

  return decodedToken.payload.exp > new Date().getTime() / 1000;
};

export const loginSchema = Yup.object({
  email: Yup.string().required('Email is required.').email('Must be a valid email.'),
  password: Yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
});

export const signupSchema = Yup.object({
  email: Yup.string().required('Email is equired').email('Invalid email.'),
  password: Yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
  password_2: Yup.string()
    .required('Must confirm password.')
    .oneOf([Yup.ref('password'), 'null'], 'Passwords must match.'),
});
