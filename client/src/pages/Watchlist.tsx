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
  }, [loginStatus, history, dispatch]);

  useEffect(() => {
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch(setAccessToken(accessToken));
      axios.defaults.headers.common.Authorization = accessToken;
    }
  }, [token, dispatch]);

  useEffect(() => {
    const watchlistPrices: WatchlistPrice[] = [];

    if (watchlists) {
      const stockAPI = new StockService();
      watchlists.forEach((wl: Watchlist) => {
        const watchlist: string[] = [...wl.watchlist];
        const watchlistPrice: WatchlistPrice = { watchlistId: wl._id, watchlistName: wl.name, user: wl.user, tickerPrices: [] };

        const loadPrices = async () => Promise.all(watchlist.map(() => stockAPI.getTickerPrices()));

        loadPrices()
          .then(promise => {
            for (let i = 0; i < promise.length; i++) {
              watchlistPrice.tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
            }
            watchlistPrices.push(watchlistPrice);
            dispatch(setWatchlistPrices(watchlistPrices));
          })
          .then(() => {});
      });
    }
  }, [prevAmount, dispatch, watchlists]);

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
      const authAPI = new AuthService();
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
