import { Router } from "express";
import { TaskController } from "../controllers/tasks.js";

export const createMovieRouter = ({ taskModel }) => {
    const moviesRouter = Router();

    const taskController = new TaskController({ taskModel })

    moviesRouter.get('/', taskController.getAll);

    moviesRouter.get('/:id', taskController.getById);

    moviesRouter.post('/', taskController.create);

    moviesRouter.put('/:id', taskController.update);

    moviesRouter.patch('/:id', taskController.updatePartial);

    moviesRouter.delete('/:id', taskController.delete);

    moviesRouter.use((req, res) => {
        return res.status(404).send('<h1>404 - Page Not Found</h1>');
    });

    return moviesRouter;
}