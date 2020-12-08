import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/actions/stockActions';

export const DiscoverContainer: React.FC = () => {
  const stockAPI = new StockService();

  // redux
  const dispatch = useDispatch();

  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    initializeDiscoverTickers();
  }, []);

  const initializeDiscoverTickers = () => {
    const sampleWatchlist = generateWatchlist(6);

    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPrices()));

    const tickerPrices: TickerPrice[] = [];

    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
      }
      setTickerPrices(tickerPrices);
    });
  };

  return (
    <div className='mt-3 p-3 sub-container'>
      <Container>
        <h3 className='sub-heading'>Discover more</h3>
      </Container>

      <Container className='discover-container'>
        {tickerPrices?.map((ticker: TickerPrice) => (
          <div className='mb-2 discover-wrap' key={ticker.symbol}>
            <div className='discover-card' onClick={() => dispatch(setTicker(ticker.symbol))}>
              <div className='mb-1 discover-badge'>
                <div className='discover-badge-text'>{ticker.symbol}</div>
              </div>

              <p className='mb-3 discover-text'>{ticker.companyName}</p>

              {ticker.prices[0].price > 0 ? (
                <div className='discover-price-wrap'>
                  <p className='mb-2'>${ticker.prices[0].price}</p>
                  <div className='discover-price-badge discover-green'>{ticker.prices[0].changePercent}%</div>
                </div>
              ) : (
                <div className='discover-price-wrap'>
                  <p className='mb-2'>${ticker.prices[0].price}</p>
                  <div className='discover-price-badge discover-red'>{ticker.prices[0].changePercent}%</div>
                </div>
              )}
            </div>
            <FontAwesomeIcon className='discover-icon' icon={faPlus} size='lg' onClick={() => alert('added to watchlist')} />
          </div>
        ))}
      </Container>
    </div>
  );
};
