import z from 'zod';

const taskSchema = z.object({
    name: z.string({
        invalid_type_error: 'Type Error',
        required_error: 'Required'
    }),
    description: z.string().max(200).min(10, 'Cantidad mínima de 10 carácteres'),
    date: z.string(),
    hour: z.string()
});

export function validateTask(task){
    return taskSchema.safeParse(task);
}
export function validateTaskPartial(task){
    return taskSchema.partial().safeParse(task);
}
