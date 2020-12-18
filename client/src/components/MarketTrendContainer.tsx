import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import { MarketTrend } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MarketTrendsContainer: React.FC = () => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    generateTickerPrices(18);
  }, []);

  /**
   * function to pick and generate stock data for set amount of stocks
   * @param {number} number the number of stock to generate
   */
  const generateTickerPrices = (number: number) => {
    const sampleWatchlist = generateWatchlist(number);
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
    <Container className='mt-3 p-3 sub-container'>
      <h2 className='sub-heading mb-3'>Market Trends</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <MarketTrend tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner animation='border' variant='dark' />
        </div>
      )}
    </Container>
  );
};

export default MarketTrendsContainer;