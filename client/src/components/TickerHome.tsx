import React from 'react';
import { ReconmendedContainer, MostFollowedContainer } from './';
import '../styles/main.min.css';

interface TickerHomeProps {}

const TickerHome: React.FC<TickerHomeProps> = ({}) => {
  return (
    <div className='mt-3 ticker-home-wrap'>
      <ReconmendedContainer />
      <MostFollowedContainer />
    </div>
  );
};

export default TickerHome;
