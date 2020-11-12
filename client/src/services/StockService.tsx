import axios, { AxiosResponse } from 'axios';

export default class StockService {
  public getTickerPrices(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/stock/prices');
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
}
