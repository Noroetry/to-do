import { readJSON } from '../../utils/require.js';
import { randomUUID } from 'node:crypto';
const tasks = readJSON('../resources/tasks.json');

export class TaskModel {
    
    static async getAll({ genre }){
        if (genre) {
            return tasks.filter(t => t.genre === genre);
        }
    return tasks;
    }

    static async getById({ id }){
        const task = tasks.find(t => t.id === id);
    return task;
    }

    static create(input){
        const newTask = {
            id: randomUUID(),
            ...input
        };
        tasks.push(newTask);
    return newTask;
    }

    static async update({id, input}){
        const idTask = tasks.findIndex(t => t.id === id);
        if (id < 0 ) return { error: "Object Not Found" };
        const taskUpdated = {
            ...tasks[idTask],
            ...input
        }
        tasks[idTask] = taskUpdated;
    return tasks[idTask];
    }

    static async delete({ id }){
        const idTask = tasks.findIndex(t => t.id === id);
        tasks.splice(idTask, 1);
    }
}