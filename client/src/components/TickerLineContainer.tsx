import React, { useEffect, useReducer } from 'react';
import { TickerLine } from './';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

interface TickerLineContainerProps {
  tickerPrices?: TickerPrice[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices }) => {
  const initialState = {
    tickerPrices: [],
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'shuffle':
        return { tickerPrices: tickerPrices?.sort(() => Math.random() - Math.random()).slice(0, 5) };
      default:
        return state;
    }
  };

  const [chartData, dispatchChartAction] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatchChartAction({ type: 'shuffle' });

    const interval = setInterval(() => {
      dispatchChartAction({ type: 'shuffle' });
    }, 5000);
    return () => clearInterval(interval);
  }, [tickerPrices]);

  return (
    <Container className='mt-3'>
      <Row>
        {chartData.tickerPrices?.map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} key={ticker.symbol} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;
