import React from 'react';
import { Navbar, NavbarBrand, Container } from 'react-bootstrap';
import '../styles/footer.min.css';

const CustomFooter: React.FC = () => {
  return (
    <div className='fixed-bottom custom-footer'>
      <Navbar color='dark'>
        <Container>
          <NavbarBrand>Footer</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomFooter;
