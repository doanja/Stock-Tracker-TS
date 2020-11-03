import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { clearAccessToken, clearLoginStatus, clearRefreshToken } from '../redux/actions/authActions';

const NavigationBar: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearLoginStatus());
    window.localStorage.removeItem('store');
    history.push('/login');
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand className='brand' href='/'>
          Recipe Mate
        </Navbar.Brand>

        <Nav className='ml-auto'>
          <div className='my-auto mr-3'>
            <FontAwesomeIcon className='mx-2 icon-navbar' icon={faHome} onClick={() => history.push('/')} />
            <FontAwesomeIcon className='mx-2 icon-navbar' icon={faHeart} onClick={() => history.push('/saved')} />
          </div>

          <Button variant='outline-light' size='sm' onClick={() => logout()}>
            {loginStatus ? 'Logout' : 'Login'}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
