// src/app.ts
import express, {Express} from 'express';
import {registerRoutes} from './routes/routes';
import morgan from 'morgan';

const app: Express = express();
app.use(morgan('dev'));

app.use(express.json());  // Middleware for parsing JSON bodies

// Register the routes
registerRoutes(app);

export default app;