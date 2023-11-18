const express = require('express');
const crypto = require('node:crypto');
const { validateTask } = require('./src/schemas/schemaTask');
const app = express();

app.disable('x-powered-by');

app.use(express.json());

PORT = process.argv[2] ?? 3000;

const tasks = [];

app.use((req, res, next) => {
    console.log('Control de seguridad (MW) ...');

    next();
})

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Root page</h1>');
})

app.get('/tasks', (req, res) => {
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
        ...req.body
    };
    tasks.push(task);
    return res.status(201).json(task);
})

app.use((req, res) => {
    return res.status(404).send('<h1>404 - Page Not Found</h1>');
})

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));