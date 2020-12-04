import React from 'react';
import '../styles/home.min.css';

interface TickerHomeProps {}

const TickerHome: React.FC<TickerHomeProps> = ({}) => {
  return (
    <div className='mt-3 p-3 home-container'>
      <h3 className='home-heading'>Ticker Home</h3>
    </div>
  );
};

export default TickerHome;
