import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services';
import { CustomModal } from '../components';
import { Home } from './';
import axios from 'axios';
import { checkTokenExp, getTickerPrices } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlists, setCurrentWatchlist, setCurrentWatchlistPrice } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';

const Watchlist: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus, refreshToken } = useSelector((state: RootStore) => state.auth);
  const { watchlists, error, token, currentWatchlist } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false);

  const requestAccessToken = useCallback(() => {
    // check refresh token expiry
    if (!checkTokenExp(refreshToken) && !showModal) {
      console.log('in if (logging out)');
      setShowModal(!showModal);
    } else {
      console.log('in else (renewing token)');
      const authAPI = new AuthService();
      authAPI
        .getAccessToken(refreshToken)
        .then(res => {
          const accessToken = `Bearer ${res.data.accessToken}`;
          dispatch(setAccessToken(accessToken));
          axios.defaults.headers.common.Authorization = accessToken;
          dispatch(getWatchlists());
        })
        .catch(err => setShowModal(!showModal));
    }
  }, [refreshToken, dispatch, showModal, setShowModal]);

  useEffect(() => {
    if (error === 'TokenExpiredError') requestAccessToken();
  }, [error, requestAccessToken]);

  useEffect(() => {
    if (!loginStatus) history.push('/login');

    dispatch(getWatchlists());
  }, [loginStatus, history, dispatch]);

  useEffect(() => {
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch(setAccessToken(accessToken));
      axios.defaults.headers.common.Authorization = accessToken;
    }
  }, [token, dispatch]);

  useEffect(() => {
    const currentWatchlistRef: Watchlist | undefined = watchlists.find((wl: Watchlist) => wl._id === currentWatchlist?._id);

    if (currentWatchlistRef) dispatch(setCurrentWatchlist(currentWatchlistRef));

    if (currentWatchlist) {
      const watchlistPrice: WatchlistPrice = { tickerPrices: [] };

      getTickerPrices(currentWatchlist.watchlist).then(res => {
        const prices: TickerPrice[] = res.data.tickerPrices;

        for (let i = 0; i < prices.length; i++) {
          watchlistPrice.tickerPrices.push(prices[i]);
        }

        dispatch(setCurrentWatchlistPrice(watchlistPrice));
      });
    }
  }, [watchlists, currentWatchlist]);

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearLoginStatus());
    window.localStorage.removeItem('store');
    history.push('/');
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
