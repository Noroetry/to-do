const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const { validateTask, validateTaskPartial } = require('./src/schemas/schemaTask');
const app = express();

app.disable('x-powered-by');

app.use(express.json());
//app.use(cors());
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:3000',
            'http://www.google.com'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true);
        }
        if (!origin){
            return callback(null, true);
        }
        return callback(new Error('Not Allowed Origin Cors...'));
    }
}));
PORT = process.argv[2] ?? 3000;

const { tasks } = require('./src/tasks');


app.use((req, res, next) => {
    console.log('Control de seguridad (MW) ...');

    next();
})

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Root page</h1>');
})

app.get('/tasks', (req, res) => {/*
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }
    */
    return res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const id = crypto.randomUUID();
    const result = validateTask(req.body);
    if (!result.success){
        return res.status(400).json(JSON.parse(result.error.message));
    }
    const task = {
        id,
        ...result.data
    };
    tasks.push(task);
    return res.status(201).json(task);
})

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const idTask = tasks.findIndex(t => t.id === id);
    if (id < 0 ) return res.status(400).send('<h1>Task not found</h1>');
    
    const result = validateTask(req.body);
    if (!result.success) return res.status(202).json(JSON.parse(result.error.message));

    taskUpdated = {
        ...tasks[idTask],
        ...result.data
    }

    tasks[idTask] = taskUpdated;
    return res.status(201).json(taskUpdated);
});

app.patch('/tasks/:id', (req, res) => {
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

app.delete('/tasks/:id', (req, res) => {
    /*
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }
    */
    const { id } = req.params;
    const idTask = tasks.findIndex(t => t.id === id);
    if (id < 0 ) return res.status(400).send('<h1>Task not found</h1>');

    tasks.splice(idTask, 1);

    return res.json({message: 'Task deleted'});
});
/*
app.options('/tasks/:id', (req, res) => {
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    }
    return res.send(200);
});
*/
app.use((req, res) => {
    return res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));