import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import '../styles/main.min.css';

interface TickerAboutProps {
  tickerPrice: TickerPrice | null;
}

const TickerAbout: React.FC<TickerAboutProps> = ({ tickerPrice }) => {
  const symbol = tickerPrice?.symbol;
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (symbol) {
      const stockAPI = new StockService();
      stockAPI
        .getCompanyInfo(symbol)
        .then(res => {
          const description = res.data.articles.description;

          description
            ? setAbout(description)
            : setAbout(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              );
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [symbol]);

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap flex-even'>
      <h3 className='sub-heading'>About</h3>
      <p className='about-body'>{about}</p>
    </div>
  );
};

export default TickerAbout;
