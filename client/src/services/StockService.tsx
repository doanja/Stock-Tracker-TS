import axios, { AxiosResponse } from 'axios';

export default class StockService {
  public getTickerPrices(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/stock/prices');
  }

  public getTickerPricesMin(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/stock/pricesMin');
  }

  public getWatchlist(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/watchlist');
  }

  public addToWatchlist(ticker: string): Promise<AxiosResponse<any>> {
    return axios.put<any>('/watchlist/add', { ticker });
  }

  public removeFromWatchlist(ticker: string): Promise<AxiosResponse<any>> {
    return axios.put<any>('/watchlist/remove', { ticker });
  }

  public getCompanyInfo(companyName: string): Promise<any> {
    return fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&explaintext=1&titles=${companyName}`, {
      method: 'GET',
    });
  }
}
