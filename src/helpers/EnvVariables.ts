import * as dotenv from 'dotenv';
dotenv.config();

class EnvVariables {
  private readonly _port: string;
  private readonly _mongoURI: string;
  private readonly _redisURL: string;
  private readonly _refreshSecret: string;
  private readonly _accessSecret: string;
  private readonly _environment: string | undefined;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.validateEnvVariables(processEnv);

    this._port = processEnv.PORT as string;
    this._mongoURI = processEnv.MONGODB_URI as string;
    this._redisURL = processEnv.REDIS_URL as string;
    this._refreshSecret = processEnv.REFRESH_SECRET as string;
    this._accessSecret = processEnv.ACCESS_SECRET as string;
    this._environment = processEnv.NODE_ENV;
  }

  public get port() {
    return this._port;
  }

  public get mongoURI() {
    return this._mongoURI;
  }

  public get redisURL() {
    return this._redisURL;
  }

  public get refreshSecret() {
    return this._refreshSecret;
  }

  public get accessSecret() {
    return this._accessSecret;
  }

  public get enviroment() {
    return this._environment;
  }

  private validateEnvVariables(processEnv: NodeJS.ProcessEnv) {
    if (!processEnv.PORT || !processEnv.MONGODB_URI || !processEnv.REDIS_URL || !processEnv.REFRESH_SECRET || !processEnv.ACCESS_SECRET) {
      throw new Error('Enviroment variables missing');
    }
  }
}

export default EnvVariables;
