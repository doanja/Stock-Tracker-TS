import React from 'react';
import { Col } from 'react-bootstrap';
import '../styles/about.min.css';

interface TickerAboutProps {
  ticker: string | null;
}

const TickerAbout: React.FC<TickerAboutProps> = ({ ticker }) => {
  return (
    <Col md={5} sm={12} xs={12} className='mt-3 p-3 about-container ml-auto'>
      <h3 className='about-heading'>About</h3> {ticker}
    </Col>
  );
};

export default TickerAbout;
