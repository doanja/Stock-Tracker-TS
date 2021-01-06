import axios, { AxiosResponse } from 'axios';

export default class StockService {
  public getTickerPrices(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/stock/prices');
  }

  public getTickerPricesMin(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/stock/pricesMin');
  }

  public getWatchlists(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/watchlist');
  }

  public createWatchlist(): Promise<AxiosResponse<any>> {
    return axios.post<any>('/watchlist');
  }

  public updateWatchlistName(watchlistId: string, name: string): Promise<AxiosResponse<any>> {
    return axios.put<any>(`/watchlist/add/${watchlistId}/${name}`);
  }

  public addToWatchlist(watchlistId: string, ticker: string): Promise<AxiosResponse<any>> {
    return axios.put<any>(`/watchlist/add/${watchlistId}/${ticker}`);
  }

  public removeFromWatchlist(watchlistId: string, ticker: string): Promise<AxiosResponse<any>> {
    return axios.put<any>(`/watchlist/remove/${watchlistId}/${ticker}`);
  }

  public deleteWatchlist(watchlistId: string): Promise<AxiosResponse<any>> {
    return axios.delete<any>(`/watchlist/${watchlistId}`);
  }

  public getCompanyInfo(companyName: string): Promise<any> {
    return fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&explaintext=1&titles=${companyName}`, {
      method: 'GET',
    });
  }
}
