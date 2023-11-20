import express, { json } from 'express';
import { moviesRouter } from './src/routes/tasks.js';
import { corsMw } from './src/middlewares/cors.js';

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT ?? 3000;

app.use(json());
app.use(corsMw());
app.use('/tasks', moviesRouter);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));