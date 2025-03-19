'use client'

import { useAuth } from '@/hook/useAuth'
import { LoginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FullScreenLoader from '../loaders/FullScreenLoader'

interface LoginFormValues {
    email: string
    password: string
}

const LoginForm = () => {
    const { loginUser } = useAuth()
    const [isPending, startTransition] = useTransition()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = async (data: LoginFormValues) => {
        startTransition(async () => {
            await loginUser(data.email, data.password)
        })
    }

    if (isPending) return <FullScreenLoader />

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[400px]">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter your email:</label>
                <input
                    type="text"
                    className="outline-none border border-white"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter your password:</label>
                <input
                    type="password"
                    className="outline-none border border-white"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black disabled:bg-gray-200 disabled:text-gray-400"
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

export default LoginForm
