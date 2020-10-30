import { Schema, model } from 'mongoose';
import { IStock } from '../@types';

const StockSchema: Schema = new Schema();

export default model<IStock>('User', StockSchema);
