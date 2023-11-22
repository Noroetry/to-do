import { createApp } from '../app.js';
import { TaskModel } from '../src/models/local-file/task.js';

createApp({taskModel: TaskModel});