import { TaskModel } from "../models/task.js";
import { validateTask, validateTaskPartial } from '../schemas/schemaTask.js';

export class TaskController {
    static async getAll(req, res){
        const { genre } = req.query;
        const tasks = await TaskModel.getAll({ genre });
        return res.json(tasks);
    }

    static async getById(req, res){
        const { id } = req.params;
        const task = await TaskModel.getById({ id });
        return res.json(task);
    }

    static async create(req, res){
        const result = validateTask(req.body);
        if (!result.success){
            return res.status(400).json(JSON.parse(result.error.message));
        }
        const newTask = await TaskModel.create(result.data);
        return res.json(newTask);
    }

    static async update(req, res){
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

        return res.json(taskUpdated);
    }

    static async updatePartial(req, res){
        const { id } = req.params;
        const exists = await TaskModel.getById({id});
        if (!exists) {
            return res.status(404).json({error: "Object Not Found"});
        }
        const result = validateTaskPartial(req.body);
        if (!result.success) {
            return res.status(202).json(JSON.parse(result.error.message));
        }
        const taskUpdated = TaskModel.update({id: id, input: result.data});

        return res.json(taskUpdated);
    }

    static async delete(req, res){
        const { id } = req.params;
        const exists = await TaskModel.getById({id});
        if (!exists) {
            return res.status(404).json({error: "Object Not Found"});
        }
        TaskModel.delete({id});
        return res.json({message: 'Task deleted'});
    }
}