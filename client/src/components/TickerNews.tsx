import React, { useEffect } from 'react';
import { NewsService } from '../services';

interface TickerNewsProps {
  ticker: string | null;
}

const TickerNews: React.FC<TickerNewsProps> = ({ ticker }) => {
  const api = new NewsService('66942a780eeb4313a546f9909092a61c');

  useEffect(() => {
    if (ticker) api.getNews(ticker).then(res => console.log('res.data', res.data));
  }, [ticker]);

  return <h1>ticker news</h1>;
};

export default TickerNews;
