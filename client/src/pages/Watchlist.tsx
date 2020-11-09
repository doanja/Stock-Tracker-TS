import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services';
import { CustomModal } from '../components';
import { Home } from '.';
import axios from 'axios';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlist } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';
import { checkTokenExp } from '../helper';

const Watchlist: React.FC = () => {
  const api = new AuthService();
  const history = useHistory();

  // redux
  const { loginStatus, refreshToken } = useSelector((state: RootStore) => state.auth);
  const { watchlist, error, token } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  // modal
  const [errorText, setErrorText] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = errorText => {
    setErrorText(errorText);
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (error === 'TokenExpiredError') requestAccessToken();
  }, [error]);

  useEffect(() => {
    if (!loginStatus) history.push('/');

    dispatch(getWatchlist());
  }, []);

  useEffect(() => {
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch(setAccessToken(accessToken));
      axios.defaults.headers.common.Authorization = accessToken;
    }
  }, [token]);

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearLoginStatus());
    window.localStorage.removeItem('store');
    history.push('/login');
  };

  const requestAccessToken = () => {
    // check refresh token expiry
    if (!checkTokenExp(refreshToken)) {
      toggleModal('Your session has expired. Please login again.');
    } else {
      api
        .getAccessToken(refreshToken)
        .then(res => {
          const accessToken = `Bearer ${res.data.accessToken}`;
          dispatch(setAccessToken(accessToken));
          axios.defaults.headers.common.Authorization = accessToken;
          dispatch(getWatchlist());
        })
        .catch(err => toggleModal('Your session has expired. Please login again.'));
    }
  };

  return (
    <Fragment>
      <CustomModal showModal={showModal} toggleModal={logout} title={'Session Error'} body={<p>{errorText}</p>} />

      {/* <Home watchlist={watchlist} /> */}
    </Fragment>
  );
};

export default Watchlist;
