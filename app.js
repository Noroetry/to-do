import express, { json } from 'express';
import { createMovieRouter } from './src/routes/tasks.js';
import { corsMw } from './src/middlewares/cors.js';

export const createApp = ({ taskModel }) => {
    const app = express();
    app.disable('x-powered-by');
    const PORT = process.env.PORT ?? 3000;

    app.use(json());
    app.use(corsMw());
    app.use('/tasks', createMovieRouter({ taskModel }));

    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
}