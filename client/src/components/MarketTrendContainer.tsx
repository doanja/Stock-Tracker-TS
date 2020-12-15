import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';
import MarketTrend from './MarketTrend';

interface MarketTrendsProps {}

const MarketTrendsContainer: React.FC<MarketTrendsProps> = ({}) => {
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
      <h2 className='sub-heading'>Market Trends</h2>
      {tickerPrices?.map((ticker: TickerPrice) => (
        <MarketTrend tickerPrice={ticker} key={ticker.symbol} />
      ))}
    </Container>
  );
};

export default MarketTrendsContainer;
