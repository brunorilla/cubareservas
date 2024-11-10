import express from 'express';
import dotenv from 'dotenv';
import { registerRoutes } from './routes/routes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

registerRoutes(app);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});