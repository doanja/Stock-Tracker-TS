export interface AuthState {
  readonly loginStatus: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export enum AuthActionTypes {
  SET_LOGIN_STATUS = 'SET_LOGIN_STATUS',
  CLEAR_LOGIN_STATUS = 'CLEAR_LOGIN_STATUS',
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  CLEAR_REFRESH_TOKEN = 'CLEAR_REFRESH_TOKEN',
}
