import { AuthState, AuthActionTypes } from '../types/authTypes';
import { Reducer } from 'redux';

const initialState: AuthState = {
  loginStatus: false,
  accessToken: '',
  refreshToken: '',
};

const authReducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_LOGIN_STATUS:
      return { ...state, loginStatus: action.payload };
    case AuthActionTypes.CLEAR_LOGIN_STATUS:
      return { ...state, loginStatus: false };
    case AuthActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case AuthActionTypes.CLEAR_ACCESS_TOKEN:
      return { ...state, accessToken: '' };
    case AuthActionTypes.SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };
    case AuthActionTypes.CLEAR_REFRESH_TOKEN:
      return { ...state, refreshToken: '' };
    default:
      return state;
  }
};

export default authReducer;
