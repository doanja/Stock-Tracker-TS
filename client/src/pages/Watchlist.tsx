import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { usePrevious } from '../helper/hooks';
import { AuthService, StockService } from '../services';
import { CustomModal } from '../components';
import { Home } from '.';
import axios from 'axios';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlist, setTickerPrices } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';
import { checkTokenExp, getTickerName } from '../helper';

const Watchlist: React.FC = () => {
  const api = new AuthService();
  const stockAPI = new StockService();
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
    if (!loginStatus) history.push('/login');

    dispatch(getWatchlist());
  }, []);

  useEffect(() => {
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch(setAccessToken(accessToken));
      axios.defaults.headers.common.Authorization = accessToken;
    }
  }, [token]);

  const prevAmount = usePrevious(watchlist);

  useEffect(() => {
    const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrice()));

    const obj: TickerPrice[] = [];

    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        obj.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
      }

      dispatch(setTickerPrices(obj));
    });
  }, [prevAmount]);

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
      <CustomModal showModal={showModal} toggleModal={logout} title={'Session Error'} body={<p>{error}</p>} />
      <Home watchlist={watchlist} />
    </Fragment>
  );
};

export default Watchlist;
