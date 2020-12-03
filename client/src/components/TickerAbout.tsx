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
  const [about, setAbout] = useState('');

  useEffect(() => {
    console.log('about :>> ', about);
    if (companyName) {
      fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&explaintext=1&titles=${companyName}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(res => {
          const response = res.query.pages;

          for (let prop in response) {
            setAbout(response[prop].extract.split('\n\n\n==')[0]);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    } else if (about === ' ') {
      setAbout(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      );
    }
  }, [companyName]);

  return (
    <Col md={5} sm={12} xs={12} className='mt-3 p-3 about-container ml-auto'>
      <h3 className='about-heading'>About</h3> {companyName}
      <p>{about}</p>
    </Col>
  );
};

export default TickerAbout;
