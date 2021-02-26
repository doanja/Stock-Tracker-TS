declare namespace Express {
  export interface Request {
    accessToken?: { _id: string; iat: number; exp: number };
    refreshToken?: { _id: string; iat: number; exp: number };
    // userId?: string;
    // watchlistId: string;
  }
}

type AccessToken = { _id: string; iat: number; exp: number };

type RefreshToken = { _id: string; iat: number; exp: number };

interface Prices {
  price: number;
  changePercent: number;
  priceChange: number;
}

type Ticker = {
  'Company Name': string;
  Symbol: string;
};
