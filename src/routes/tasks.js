import { Router } from "express";
export const moviesRouter = Router();
import { TaskController } from "../controllers/tasks.js";

moviesRouter.get('/', TaskController.getAll);

moviesRouter.get('/:id', TaskController.getById);

moviesRouter.post('/', TaskController.create);

moviesRouter.put('/:id', TaskController.update);

moviesRouter.patch('/:id', TaskController.updatePartial);

moviesRouter.delete('/:id', TaskController.delete);

moviesRouter.use((req, res) => {
    return res.status(404).send('<h1>404 - Page Not Found</h1>');
});