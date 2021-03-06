import axios, { AxiosResponse } from 'axios';

export default class StockService {
  public getTickerPrices(watchlist: string[]): Promise<AxiosResponse<any>> {
    return axios.post<any>('/stock/prices/', { watchlist });
  }

  public getWatchlists(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/watchlist');
  }

  public getWatchlistById(watchlistId: string): Promise<AxiosResponse<any>> {
    return axios.get<any>(`/watchlist/${watchlistId}`);
  }

  public createWatchlist(name: string): Promise<AxiosResponse<any>> {
    return axios.post<any>('/watchlist', { name });
  }

  public updateWatchlistName(watchlistId: string, name: string): Promise<AxiosResponse<any>> {
    return axios.put<any>(`/watchlist/${watchlistId}/${name}`);
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

  public getCompanyInfo(symbol: string): Promise<any> {
    return axios.get<any>(`/stock/prices/${symbol}`);
  }
}
