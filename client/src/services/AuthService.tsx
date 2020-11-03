import axios from 'axios';

export default class AuthService {
  public signup(email: string, password: string) {
    return axios.post('/signup', { email, password });
  }

  public login(email: string, password: string) {
    return axios.post('/login', { email, password });
  }

  public logout() {
    return axios.post('/logout');
  }

  public getRefreshToken(refreshToken: string) {
    return axios.post('/refresh-token', { refreshToken });
  }

  public getAccessToken(refreshToken: string) {
    return axios.post('/access-token', { refreshToken });
  }
}
