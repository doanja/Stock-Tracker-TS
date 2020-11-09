import { Schema, model } from 'mongoose';
import { string } from 'yup';
import { IUser } from '../@types';

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    watchlist: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
