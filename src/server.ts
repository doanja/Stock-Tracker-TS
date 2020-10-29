import App from './helpers/App';
import { RedisClient } from 'redis';
import EnvVariables from './helpers/EnvVariables';

export const envVariables: EnvVariables = new EnvVariables(process.env);
export const app: App = new App();

app.listen();

export const client: RedisClient = app.redisClient;
