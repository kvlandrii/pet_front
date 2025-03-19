'use client'

import { useAuth } from '@/hook/useAuth'
import { RegisterSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

type RegisterFormValues = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterForm = () => {
    const { registerUser } = useAuth()
    const [isPending, startTransition] = useTransition()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
    })

    const onSubmit = async (data: RegisterFormValues) => {
        startTransition(async () => {
            await registerUser(data.name, data.email, data.password)
        })
    }

    if (isPending) return <div>Loading...</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[400px]">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter your name:</label>
                <input
                    type="text"
                    className="outline-none border border-white"
                    placeholder="Name"
                    {...register('name')}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your email:</label>
                <input
                    type="email"
                    className="outline-none border border-white"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your password:</label>
                <input
                    type="password"
                    className="outline-none border border-white"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Confirm Password:</label>
                <input
                    type="password"
                    className="outline-none border border-white"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black disabled:bg-gray-200 disabled:text-gray-400"
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm
