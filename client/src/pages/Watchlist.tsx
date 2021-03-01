import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService, StockService } from '../services';
import { CustomModal } from '../components';
import { Home } from './';
import axios from 'axios';
import { checkTokenExp, loadPrices } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlists, setWatchlistPrices } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';

const Watchlist: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus, refreshToken } = useSelector((state: RootStore) => state.auth);
  const { watchlists, error, token, watchlistPrices, newSymbol } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false);

  const requestAccessToken = useCallback(() => {
    // check refresh token expiry
    if (!checkTokenExp(refreshToken) && !showModal) {
      console.log('in if');
      setShowModal(!showModal);
    } else {
      console.log('in else');
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

  const test = async (watchlists: Watchlist[]): Promise<WatchlistPrice[]> => {
    const watchlistPrices: WatchlistPrice[] = [];

    await watchlists.forEach(async (wl: Watchlist) => {
      const watchlistPrice: WatchlistPrice = { _id: wl._id, name: wl.name, user: wl.user, tickerPrices: [] };

      await loadPrices(wl.watchlist).then(res => {
        const prices: TickerPrice[] = res.data.tickerPrices;

        for (let i = 0; i < prices.length; i++) {
          watchlistPrice.tickerPrices.push(prices[i]);
        }
        watchlistPrices.push(watchlistPrice);
      });
      console.log('wl.name', wl.name);
    });
    console.log('---------------------------------------------');
    return watchlistPrices;
  };

  useEffect(() => {
    if (watchlists.length > 0 /*&& watchlistPrices.length < 1*/) {
      // const watchlistPrices: WatchlistPrice[] = [];

      // calc prices for each watchlist
      // watchlists.forEach((wl: Watchlist) => {
      // const watchlistPrice: WatchlistPrice = { _id: wl._id, name: wl.name, user: wl.user, tickerPrices: [] };
      // get starting price for each symbol in the watchlist & builds the TickerPrice object
      // loadPrices(wl.watchlist).then(res => {
      //   const prices: TickerPrice[] = res.data.tickerPrices;
      //   for (let i = 0; i < prices.length; i++) {
      //     watchlistPrice.tickerPrices.push(prices[i]);
      //   }
      //   watchlistPrices.push(watchlistPrice);
      //   dispatch(setWatchlistPrices(watchlistPrices));
      // });

      test(watchlists).then(watchlistPrices => {
        console.log('watchlistPrices', watchlistPrices);
        // dispatch(setWatchlistPrices(watchlistPrices));
      });
      // });
    }
  }, [dispatch, watchlists, newSymbol]);

  useEffect(() => {
    // TODO: resolve issue where watchlist would update, but watchlistPrices does not update
    // change backend add ticker / remove ticker from watchlist to return the ticker that was added/removed
    // make sure user sends watchlist id and ticker symbol
    // change redux to filter out the ticker symbol
    // console.log('################################################');
    // console.log('watchlists', watchlists[0]);
    // console.log('watchlistPrices', watchlistPrices[0]);
  }, [watchlists]);

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
