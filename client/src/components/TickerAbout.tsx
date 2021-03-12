import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import '../styles/main.min.css';

interface TickerAboutProps {
  tickerPrice: TickerPrice | null;
}

const TickerAbout: React.FC<TickerAboutProps> = ({ tickerPrice }) => {
  const symbol = tickerPrice?.symbol;
  const [about, setAbout] = useState('');
  const [ceo, setCeo] = useState('-');
  const [industry, setIndustry] = useState('-');
  const [headquarters, setHeadquarters] = useState('-');
  const [website, setWebsite] = useState('-');
  const [employees, setEmployees] = useState('-');

  useEffect(() => {
    if (symbol) {
      const stockAPI = new StockService();
      stockAPI
        .getCompanyInfo(symbol)
        .then(res => {
          const { description, CEO, industry, address, state, city, country, website, employees } = res.data.articles;

          description
            ? setAbout(description)
            : setAbout(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              );

          CEO ? setCeo(CEO) : setCeo('-');
          industry ? setIndustry(industry) : setIndustry('-');
          address && state && city && country ? setHeadquarters(address + '\n' + city + ', ' + state + '\n' + country) : setHeadquarters('-');
          website ? setWebsite(website) : setWebsite('-');
          employees ? setEmployees(employees) : setEmployees('-');
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [symbol]);

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap flex-even about-container'>
      <h3 className='sub-heading'>About</h3>
      <p className='mt-3 about-body'>{about}</p>

      <br />

      <span className='about-sub-wrap'>
        <div className='about-sub-section'>
          <div className='about-sub-left'>CEO</div>
          <div className='about-sub-right'>{ceo}</div>
        </div>

        <div className='about-sub-section'>
          <div className='about-sub-left'>INDUSTRY</div>
          <div className='about-sub-right'>{industry}</div>
        </div>

        <div className='about-sub-section'>
          <div className='about-sub-left'>HEADQUARTERS</div>
          <div className='about-sub-right'>{headquarters}</div>
        </div>

        <div className='about-sub-section'>
          <div className='about-sub-left'>WEBSITE</div>
          <div className='about-sub-right'>{website}</div>
        </div>

        <div className='about-sub-section'>
          <div className='about-sub-left'>EMPLOYEES</div>
          <div className='about-sub-right'>{employees}</div>
        </div>
      </span>
    </div>
  );
};

export default TickerAbout;
