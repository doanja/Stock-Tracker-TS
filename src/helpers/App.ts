import express, { Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import { Route } from '../@types';
import { createClient, RedisClient } from 'redis';
import EnvVariables from './EnvVariables';
import { AuthRoute, RecipeRoute, UserRoute } from '../routes';
import { Server } from 'http';

class App {
  public app: Application;
  public server: Server | undefined;
  private readonly port: string;
  private readonly environment: string | undefined;
  public redisClient: RedisClient;

  constructor(env: EnvVariables = new EnvVariables(), routes: Route[] = [new RecipeRoute(), new UserRoute(), new AuthRoute()]) {
    this.app = express();
    this.port = env.port;
    this.environment = env.enviroment;
    this.redisClient = createClient(env.redisURL);

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initialzeDBConnection(env.mongoURI);
    this.initializeRedis();
  }

  private initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(passport.initialize());

    // serve up static assets (heroku)
    if (this.environment === 'production') this.app.use(express.static('client/build'));
  }

  private initializeRoutes(routes: Route[]) {
    // API routes
    routes.forEach((route: Route) => this.app.use('/', route.router));

    // Send every other request to the React app (Define any API routes before this runs)
    this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/build/index.html')));
  }

  private initialzeDBConnection(mongoURI: string) {
    mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(res => console.log('Database connected...'))
      .catch(err => console.log('Error connecting to the database:', err));
  }

  public initializeRedis() {
    this.redisClient.on('connect', () => console.log('Client connected to redis...'));
    this.redisClient.on('ready', () => console.log('Client connected to redis and ready to use...'));
    this.redisClient.on('error', err => console.log(err.message));
    this.redisClient.on('end', () => console.log('Client disconnected from redis'));
    process.on('SIGINT', () => this.redisClient.quit());
  }

  public listen() {
    process.on('SIGINT', () => process.exit(1));

    // start the server
    this.server = this.app.listen(this.port, () => console.log(`Server started on port ${this.port}. Visit http://localhost:${this.port}/`));
  }

  public close() {
    if (this.server !== undefined) this.server.close();
  }
}

export default App;
