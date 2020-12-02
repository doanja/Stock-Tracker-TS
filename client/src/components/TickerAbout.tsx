import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { StockService } from '../services';
import '../styles/about.min.css';

interface TickerAboutProps {
  tickerPrice: TickerPrice | null;
}

const TickerAbout: React.FC<TickerAboutProps> = ({ tickerPrice }) => {
  const api = new StockService();
  const companyName = tickerPrice?.companyName;
  const [about, setAbout] = useState('initialState');

  useEffect(() => {
    if (companyName) {
      console.log('company name');
      api.getCompanyInfo(companyName).then(res => {
        console.log('test');
        console.log('res.data :>> ', res.data);
      });
    }
  }, [companyName]);

  return (
    <Col md={5} sm={12} xs={12} className='mt-3 p-3 about-container ml-auto'>
      <h3 className='about-heading'>About</h3> {companyName}
    </Col>
  );
};

export default TickerAbout;
