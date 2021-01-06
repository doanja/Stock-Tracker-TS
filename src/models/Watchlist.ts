import { Schema, model } from 'mongoose';
import { IWatchlist } from '../@types';

const Watchlist: Schema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    watchlist: [{ type: String, trim: true }],
  },
  { timestamps: false }
);

export default model<IWatchlist>('Watchlist', Watchlist);
