import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  auth: authReducer,
  modal: modalReducer,
});

export default rootReducer;
