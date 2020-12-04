import React from 'react';
import '../styles/main.min.css';

interface TickerHomeProps {}

const TickerHome: React.FC<TickerHomeProps> = ({}) => {
  return (
    <div className='mt-3 p-3 sub-container'>
      <h3 className='sub-heading'>Ticker Home</h3>
    </div>
  );
};

export default TickerHome;
