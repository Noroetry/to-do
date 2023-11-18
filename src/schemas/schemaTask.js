const z = require('zod');

const taskSchema = z.object({
    name: z.string({
        invalid_type_error: 'Type Error',
        required_error: 'Required'
    }),
    description: z.string().max(200).min(10, 'Cantidad mínima de 10 carácteres'),
    date: z.string(),
    hour: z.string()
});

function validateTask(task){
    return taskSchema.safeParse(task);
}

module.exports = {
    validateTask
}