import React, { useEffect } from 'react';
import { NewsService } from '../services';
import '../styles/news.min.css';

interface TickerNewsContainerProps {
  ticker: string | null;
}

const TickerNewsContainer: React.FC<TickerNewsContainerProps> = ({ ticker }) => {
  const api = new NewsService('66942a780eeb4313a546f9909092a61c');

  useEffect(() => {
    if (ticker) api.getNews(ticker).then(res => console.log('res.data', res.data));
  }, [ticker]);

  return (
    <div className='mt-3 p-3 news-container'>
      <h3>In the news</h3>
    </div>
  );
};

export default TickerNewsContainer;
