import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Signup, PageNotFound, Saved } from './pages';
import { CustomModal } from './components';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from './redux/Store';
import { toggleModal } from './redux/actions/modalActions';

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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/saved' component={Saved} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
