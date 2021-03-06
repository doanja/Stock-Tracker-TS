import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { clearAccessToken, clearLoginStatus, clearRefreshToken } from '../redux/actions/authActions';
import { clearCurrentWatchlist, clearTicker } from '../redux/actions/stockActions';

const CustomNavbar: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  const navigateHome = () => {
    dispatch(clearTicker());
    dispatch(clearCurrentWatchlist());
    history.push('/login');
  };

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearLoginStatus());
    window.localStorage.removeItem('store');
    history.push('/login');
  };

  return (
    <Navbar variant='dark' className='custom-navbar'>
      <Container>
        <Navbar.Brand className='brand' href='/'>
          Stock Tracker
        </Navbar.Brand>

        <Nav className='ml-auto'>
          <div className='my-auto mr-3'>
            <FontAwesomeIcon className='mx-2 icon-navbar' icon={faHome} onClick={navigateHome} />
            <FontAwesomeIcon className='mx-2 icon-navbar' icon={faHeart} onClick={() => history.push('/watchlist')} />
          </div>

          <Button variant='outline-light' size='sm' onClick={() => logout()}>
            {loginStatus ? 'Logout' : 'Login'}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
