import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

/**
 * function to sync the store to local storage
 * @param {Object} store the redux store to be synced
 * @return {undefined} returns undefined if there is an  error
 */
const saveToLocalStorage = (store: { loginStatus: boolean; refreshToken: string; accessToken: string }): void => {
  try {
    localStorage.setItem('store', JSON.stringify(store));
  } catch (err) {
    return undefined;
  }
};

/**
 * function to load from local storage and serialize it to the redux store
 * also sets up the access token in axios' headers
 * @return {undefined} returns undefined if there is an error
 */
const loadFromLocalStorage = () => {
  try {
    const serializedStore = localStorage.getItem('store');

    if (!serializedStore) return undefined;

    const token: string = JSON.parse(serializedStore).accessToken;

    token ? (axios.defaults.headers.common.Authorization = token) : (axios.defaults.headers.common.Authorization = null);

    return { auth: JSON.parse(serializedStore) };
  } catch (err) {
    return undefined;
  }
};

const store = createStore(rootReducer, loadFromLocalStorage(), composeWithDevTools(applyMiddleware(thunk)));

// sync store.auth to local storage
store.subscribe(() => saveToLocalStorage(store.getState().auth));

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
