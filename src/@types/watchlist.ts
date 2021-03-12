import { Document } from 'mongoose';
import { IUser } from './';

export interface IWatchlist extends Document {
  name: string;
  user: IUser['_id'];
  watchlist: string[];
}
