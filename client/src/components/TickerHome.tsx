import React from 'react';
import { ReconmendedContainer, MostFollowedContainer } from './';
import '../styles/main.min.css';

const TickerHome: React.FC = ({}) => {
  return (
    <div className='mt-3 ticker-home-wrap'>
      <ReconmendedContainer />
      <MostFollowedContainer />
    </div>
  );
};

export default TickerHome;
