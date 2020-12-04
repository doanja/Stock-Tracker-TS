import React from 'react';
import '../styles/discover.min.css';

interface DiscoverContainerProps {}

export const DiscoverContainer: React.FC<DiscoverContainerProps> = ({}) => {
  return (
    <div className='mt-3 p-3 discover-container'>
      <h3 className='discover-heading'>Discover</h3>
    </div>
  );
};
