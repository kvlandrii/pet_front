import { z } from 'zod'

export const RegisterSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters long'),
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})


export const TodoSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters long'),
    description: z.string().min(2, 'Description must be at least 2 characters long'),
    completed: z.boolean(),
})