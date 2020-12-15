import React, { useState, useEffect } from 'react';
import { TickerLine } from './';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTickerPrices } from '../redux/actions/stockActions';

interface TickerLineContainerProps {
  tickerPrices?: TickerPrice[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices }) => {
  const [test, setTest] = useState<any>([]);
  // redux
  const { watchlist } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const shufflePrices = (): void => {
    if (tickerPrices) {
      setTest(tickerPrices.sort(() => Math.random() - Math.random()).slice(0, 5));
      console.log('test :>> ', test);
      console.log('watchlist :>> ', watchlist);
      // dispatch(setTickerPrices(tickerPrices.sort(() => Math.random() - Math.random())));
    }
  };

  useEffect(() => {
    shufflePrices();

    const interval = setInterval(() => {
      if (tickerPrices) shufflePrices();
    }, 5000);
    return () => clearInterval(interval);
  }, [watchlist]);

  return (
    <Container className='mt-3'>
      <Row>
        {test?.map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} key={ticker.symbol} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;
