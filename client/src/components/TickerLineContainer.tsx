import React, { useEffect, useReducer } from 'react';
import { TickerLine } from './';
import { bulkUpdatePrices } from '../helper';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

interface TickerLineContainerProps {
  tickerPrices?: TickerPrice[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices }) => {
  const initialState = {
    tickerPrices: [],
    updatedTickerPrices: [],
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'shuffle':
        if (tickerPrices) {
          let temp: TickerPrice[] = [...tickerPrices];
          temp = bulkUpdatePrices(temp);
          temp = temp.sort(() => Math.random() - Math.random()).slice(0, 5);
          return { updatedTickerPrices: temp };
        }

        return { updatedTickerPrices: [] };
      default:
        return state;
    }
  };

  const [priceData, dispatchAction] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tickerPrices) dispatchAction({ type: 'shuffle' });
    }, 10000);
    return () => clearInterval(interval);
  }, [tickerPrices]);

  useEffect(() => {
    if (tickerPrices) dispatchAction({ type: 'shuffle' });
  }, [tickerPrices]);

  return (
    <Container className='mt-3'>
      <Row>
        {priceData.updatedTickerPrices?.map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} key={ticker.symbol} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;
