import React from 'react';
import { Spinner } from 'react-bootstrap';

const CustomSpinner: React.FC = () => {
  return (
    <div className='mt-3 text-center'>
      <Spinner animation='border' variant='light' />
    </div>
  );
};
export default CustomSpinner;
