import axios, { AxiosResponse } from 'axios';

export default class NewsService {
  public getNews(query: string): Promise<AxiosResponse<any>> {
    return axios.get<any>(`/news/${query}`);
  }

  public getTopHeadlines(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/news');
  }
}
