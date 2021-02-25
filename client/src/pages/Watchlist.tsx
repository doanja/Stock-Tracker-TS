import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { usePrevious } from '../helper/hooks';
import { AuthService, StockService } from '../services';
import { CustomModal } from '../components';
import { Home } from './';
import axios from 'axios';
import { checkTokenExp, getTickerName } from '../helper';

import { AxiosResponse } from 'axios';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { getWatchlists, setWatchlistPrices } from '../redux/actions/stockActions';
import { clearAccessToken, clearLoginStatus, clearRefreshToken, setAccessToken } from '../redux/actions/authActions';

const Watchlist: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus, refreshToken } = useSelector((state: RootStore) => state.auth);
  const { watchlists, error, token, watchlistPrices } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const prevAmount = usePrevious(watchlists);

  // modal
  const [showModal, setShowModal] = useState(false);

  const requestAccessToken = useCallback(() => {
    console.log('request access token');
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

  // return promise array for each symbol in watchlist
  const loadPrices = async (watchlist: string[]): Promise<AxiosResponse<TickerPrice>[]> => {
    const stockAPI = new StockService();
    return Promise.all(watchlist.map(() => stockAPI.getTickerPrices()));
  };

  // return promise array for each array in watchlistPrices
  const generateTickerPrices = async (wl: Watchlist): Promise<WatchlistPrice[]> => {
    const newWatchlistPrices: WatchlistPrice[] = [];

    try {
      const watchlistPrice: WatchlistPrice = { _id: wl._id, name: wl.name, user: wl.user, tickerPrices: [] };

      await loadPrices(wl.watchlist).then(promise => {
        for (let i = 0; i < promise.length; i++) {
          watchlistPrice.tickerPrices.push({
            symbol: wl.watchlist[i],
            companyName: getTickerName(wl.watchlist[i]),
            prices: promise[i].data.prices,
          });
        }

        newWatchlistPrices.push(watchlistPrice);
      });

      return newWatchlistPrices;
    } catch (error) {
      return newWatchlistPrices;
    }
  };

  useEffect(() => {
    const load = async (wl: Watchlist) => await generateTickerPrices(wl);

    const load2 = async () => await Promise.all(watchlists.map((wl: Watchlist) => load(wl)));
  }, []);

  // useEffect(() => {
  //   const watchlistPrices: WatchlistPrice[] = [];

  //   if (watchlists) {
  //     const stockAPI = new StockService();

  //     watchlists.forEach((wl: Watchlist) => {
  //       const watchlist: string[] = [...wl.watchlist];
  //       const watchlistPrice: WatchlistPrice = { watchlistId: wl._id, watchlistName: wl.name, user: wl.user, tickerPrices: [] };

  //       const loadPrices = async () => Promise.all(watchlist.map(() => stockAPI.getTickerPrices()));

  //       loadPrices().then(promise => {
  //         for (let i = 0; i < promise.length; i++) {
  //           watchlistPrice.tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
  //         }
  //         watchlistPrices.push(watchlistPrice);
  //         dispatch(setWatchlistPrices(watchlistPrices));
  //       });
  //     });
  //   }
  // }, [prevAmount, dispatch, watchlists]);

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
