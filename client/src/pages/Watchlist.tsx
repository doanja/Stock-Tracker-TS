import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { usePrevious } from '../helper/hooks';
import { AuthService, StockService } from '../services';
import { CustomModal } from '../components';
import { Home } from './';
import axios from 'axios';
import { checkTokenExp, getTickerName } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlists, setWatchlistPrices } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';

const Watchlist: React.FC = () => {
  const authAPI = new AuthService();
  const stockAPI = new StockService();

  const history = useHistory();

  // redux
  const { loginStatus, refreshToken } = useSelector((state: RootStore) => state.auth);
  const { watchlists, error, token } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const prevAmount = usePrevious(watchlists);

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (error === 'TokenExpiredError') requestAccessToken();
  }, [error]);

  useEffect(() => {
    if (!loginStatus) history.push('/login');

    dispatch(getWatchlists());
  }, []);

  useEffect(() => {
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch(setAccessToken(accessToken));
      axios.defaults.headers.common.Authorization = accessToken;
    }
  }, [token]);

  useEffect(() => {
    const watchlistPrices: TickerPrice[][] = [];

    if (watchlists) {
      watchlists.forEach(item => {
        const watchlist: string[] = [...item.watchlist];
        const tickerPrices: TickerPrice[] = [];

        const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrices()));

        loadPrices().then(promise => {
          for (let i = 0; i < promise.length; i++) {
            tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
          }
          watchlistPrices.push(tickerPrices);
          dispatch(setWatchlistPrices(watchlistPrices.reverse()));
        });
      });
    }
  }, [prevAmount]);

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearLoginStatus());
    window.localStorage.removeItem('store');
    history.push('/');
  };

  const requestAccessToken = () => {
    // check refresh token expiry
    if (!checkTokenExp(refreshToken)) toggleModal();
    else {
      authAPI
        .getAccessToken(refreshToken)
        .then(res => {
          const accessToken = `Bearer ${res.data.accessToken}`;
          dispatch(setAccessToken(accessToken));
          axios.defaults.headers.common.Authorization = accessToken;
          dispatch(getWatchlists());
        })
        .catch(err => toggleModal());
    }
  };

  return (
    <Fragment>
      <CustomModal
        showModal={showModal}
        toggleModal={logout}
        title={'Session Error'}
        body={<p className='my-3 text-dark'>Your session has expired. Please login again.</p>}
      />
      <Home />
    </Fragment>
  );
};

export default Watchlist;
