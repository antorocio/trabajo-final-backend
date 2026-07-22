import { z } from "zod"

const taskStatus = z.enum([ "pending", "in_progress", "completed" ])

const taskPriority = z.enum([ "low", "medium", "high" ])

export const createTaskValidator = z.object({
    title: z
        .string()
        .trim()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(100, "El título no puede superar los 100 caracteres"),

    description: z
        .string()
        .trim()
        .max(500, "La descripción no puede superar los 500 caracteres")
        .optional(),

    status: taskStatus.optional(),

    priority: taskPriority.optional(),

    dueDate: z.coerce
        .date({ error: "La fecha de vencimiento no es válida" })
    .optional()
})

export const updateTaskValidator = createTaskValidator
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "Debes enviar al menos un campo para actualizar"
        }
    )

export const taskQueryValidator = z.object({
    status: taskStatus.optional(),

    priority: taskPriority.optional(),

    search: z
        .string()
        .trim()
        .min(1, "La búsqueda no puede estar vacía")
        .optional(),

    sort: z
        .enum([
            "createdAt",
            "-createdAt",
            "dueDate",
            "-dueDate",
            "title",
            "-title"
        ])
        .optional(),

    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(10)
})