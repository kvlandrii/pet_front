'use client'

import { LoginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FullScreenLoader from '../loaders/FullScreenLoader'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { paths } from '@/lib/paths'
import { useLoginMutation } from '@/api/mutations'

interface LoginFormValues {
    email: string
    password: string
}

const LoginForm = () => {
    const { isPending, mutate: loginMutation, isSuccess, error } = useLoginMutation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
    })
    const router = useRouter()

    const onSubmit = async (data: LoginFormValues) => {
        loginMutation(data)
    }

    useEffect(() => {
        if (isSuccess) {
            router.push(paths.root)
        }
    }, [isSuccess, router])

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
            {error && <span className="text-red-500">{error.response?.data?.message}</span>}
        </form>
    )
}

export default LoginForm
