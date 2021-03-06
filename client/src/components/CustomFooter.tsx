import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/main.min.css';

const CustomFooter: React.FC = () => {
  return (
    <Navbar variant='dark' className='custom-footer'>
      <Container>
        <div className='text-center'>
          <Navbar.Brand className='brand' href='/'>
            Stock Tracker
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='/help'>Help</Nav.Link>
            <Nav.Link href='/privacy'>Privacy</Nav.Link>
            <Nav.Link href='/terms'>Terms</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomFooter;
