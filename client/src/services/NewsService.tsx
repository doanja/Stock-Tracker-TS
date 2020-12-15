import axios, { AxiosResponse } from 'axios';
import moment from 'moment';

export default class NewsService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getNews(query: string): Promise<AxiosResponse<any>> {
    return axios.get<any>(
      `http://newsapi.org/v2/everything?q=${query}&from=${moment().format('YYYY-MM-DD')}&sortBy=popularity&apiKey=${this.apiKey}`
    );
  }

  public getTopHeadlines(): Promise<AxiosResponse<any>> {
    return axios.get<any>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}`);
  }
}
