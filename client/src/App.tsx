import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Home, Login, Signup, PageNotFound, Watchlist } from './pages';
import { CustomModal } from './components';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from './redux/Store';
import { toggleModal } from './redux/actions/modalActions';

const LazyHome = lazy(() => import('./pages/Home'));
const LazyLogin = lazy(() => import('./pages/Login'));
const LazySignup = lazy(() => import('./pages/Signup'));
const LazyWatchlist = lazy(() => import('./pages/Watchlist'));
const LazyPageNotFound = lazy(() => import('./pages/PageNotFound'));

const App: React.FC = () => {
  // redux
  const { showModal, modalBody, modalTitle } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  return (
    <div className='wrap'>
      <CustomModal
        showModal={showModal}
        toggleModal={() => dispatch(toggleModal(!showModal, modalBody, 'Error'))}
        title={modalTitle}
        body={<p>{modalBody}</p>}
      />
      <Router>
        <Suspense fallback=''>
          <Switch>
            <Route exact path='/' component={LazyHome} />
            <Route exact path='/login' component={LazyLogin} />
            <Route exact path='/signup' component={LazySignup} />
            <Route exact path='/watchlist' component={LazyWatchlist} />
            <Route path='*' component={LazyPageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
