import { Router } from "express";
export const moviesRouter = Router();
import { TaskModel } from "../models/Task.js";
import { validateTask, validateTaskPartial } from '../schemas/schemaTask.js';

moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query;
    const tasks = await TaskModel.getAll({ genre });
    return res.json(tasks);
});

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await TaskModel.getById({ id });
    return res.json(task);
});

moviesRouter.post('/', async (req, res) => {
    const result = validateTask(req.body);
    if (!result.success){
        return res.status(400).json(JSON.parse(result.error.message));
    }
    const newTask = await TaskModel.create(result.data);
    return res.json(newTask);
})

moviesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const exists = await TaskModel.getById({id});
    if (!exists) {
        return res.status(404).json({error: "Object Not Found"});
    }
    const result = validateTask(req.body);
    if (!result.success) {
        return res.status(202).json(JSON.parse(result.error.message));
    }
    const taskUpdated = TaskModel.update({id: id, input: result.data});
    res.json(taskUpdated);
});

moviesRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const idTask = tasks.findIndex(t => t.id === id);
    if (id < 0 ) return res.status(400).send('<h1>Task not found</h1>');
    
    const result = validateTaskPartial(req.body);
    if (!result.success) return res.status(202).json(JSON.parse(result.error.message));

    taskModified = {
        ...tasks[idTask],
        ...result.data
    }

    tasks[idTask] = taskModified;
    return res.status(201).json(taskModified);
});

moviesRouter.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const idTask = tasks.findIndex(t => t.id === id);
    if (id < 0 ) return res.status(400).send('<h1>Task not found</h1>');

    tasks.splice(idTask, 1);

    return res.json({message: 'Task deleted'});
});

moviesRouter.use((req, res) => {
    return res.status(404).send('<h1>404 - Page Not Found</h1>');
});