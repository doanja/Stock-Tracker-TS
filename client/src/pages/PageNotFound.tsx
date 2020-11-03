import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const PageNotFound: React.FC = () => {
  return (
    <Modal className='text-center' show={true} backdrop={false} animation={false} centered>
      <Modal.Body className='py-5'>
        <img src='https://image.flaticon.com/icons/png/128/3286/3286286.png' alt='404' />

        <h2 className='py-3 text-secondary'>Page not Found</h2>
        <p>
          The page you are looking for doesn't exist.
          <br /> Go back, or head over to{' '}
          <Link to='/' className='text-secondary'>
            Home
          </Link>{' '}
          to choose a new direction.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default PageNotFound;
