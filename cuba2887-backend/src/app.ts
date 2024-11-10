// src/app.ts
import express, {Express} from 'express';
import {registerRoutes} from './routes';

const app: Express = express();

app.use(express.json());  // Middleware for parsing JSON bodies

// Register the routes
registerRoutes(app);

export default app;