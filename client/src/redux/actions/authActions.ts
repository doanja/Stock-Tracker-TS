import { AuthActionTypes } from '../types/authTypes';

export const setLoginStatus = (loginStatus: boolean) => {
  return { type: AuthActionTypes.SET_LOGIN_STATUS, payload: loginStatus };
};

export const clearLoginStatus = () => {
  return { type: AuthActionTypes.CLEAR_LOGIN_STATUS };
};

export const setAccessToken = (accessToken: string) => {
  return { type: AuthActionTypes.SET_ACCESS_TOKEN, payload: accessToken };
};

export const clearAccessToken = () => {
  return { type: AuthActionTypes.CLEAR_ACCESS_TOKEN };
};

export const setRefreshToken = (refreshToken: string) => {
  return { type: AuthActionTypes.SET_REFRESH_TOKEN, payload: refreshToken };
};

export const clearRefreshToken = () => {
  return { type: AuthActionTypes.CLEAR_REFRESH_TOKEN };
};
