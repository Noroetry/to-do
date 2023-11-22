import { validateTask, validateTaskPartial } from '../schemas/schemaTask.js';

export class TaskController {
    constructor ({ taskModel }){
        this.taskModel = taskModel;
    }

    getAll = async (req, res) => {
        const { genre } = req.query;
        const tasks = await this.taskModel.getAll({ genre });
        return res.json(tasks);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const task = await this.taskModel.getById({ id });
        return res.json(task);
    }

    create = async (req, res) => {
        const result = validateTask(req.body);
        if (!result.success){
            return res.status(400).json(JSON.parse(result.error.message));
        }
        const newTask = await this.taskModel.create(result.data);
        return res.json(newTask);
    }

    update = async (req, res) =>{
        const { id } = req.params;
        const exists = await this.taskModel.getById({id});
        if (!exists) {
            return res.status(404).json({error: "Object Not Found"});
        }
        const result = validateTask(req.body);
        if (!result.success) {
            return res.status(202).json(JSON.parse(result.error.message));
        }
        const taskUpdated = this.taskModel.update({id: id, input: result.data});

        return res.json(taskUpdated);
    }

    updatePartial = async (req, res) => {
        const { id } = req.params;
        const exists = await this.taskModel.getById({id});
        if (!exists) {
            return res.status(404).json({error: "Object Not Found"});
        }
        const result = validateTaskPartial(req.body);
        if (!result.success) {
            return res.status(202).json(JSON.parse(result.error.message));
        }
        const taskUpdated = this.taskModel.update({id: id, input: result.data});

        return res.json(taskUpdated);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        const exists = await this.taskModel.getById({id});
        if (!exists) {
            return res.status(404).json({error: "Object Not Found"});
        }
        TaskModel.delete({id});
        return res.json({message: 'Task deleted'});
    }
}