import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { generateWatchlist, getTickerName, bulkUpdatePrices } from '../helper';
import { MarketTrend } from './';
import { Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MarketTrendsContainer: React.FC = () => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    generateTickerPrices(18);
    return () => setIsMounted(false);
  }, []);

  /**
   * function to pick and generate stock data for set amount of stocks
   * @param {number} number the number of stock to generate
   */
  const generateTickerPrices = (number: number) => {
    const sampleWatchlist = generateWatchlist(number);
    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPricesMin()));
    const tickerPrices: TickerPrice[] = [];
    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
        setTickerPrices(tickerPrices);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (tickerPrices) setTickerPrices(bulkUpdatePrices(tickerPrices));
    }, 5000);
    return () => clearInterval(interval);
  }, [tickerPrices]);

  if (!isMounted) return null;

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap flex-even'>
      <h2 className='sub-heading mb-3'>Market Trends</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <MarketTrend tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner className='mb-3' animation='border' variant='dark' />
        </div>
      )}
    </div>
  );
};

export default MarketTrendsContainer;
