'use client'

import { RegisterSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FullScreenLoader from '../loaders/FullScreenLoader'
import { useRegisterMutation } from '@/api/mutations'
import { paths } from '@/lib/paths'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type RegisterFormValues = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterForm = () => {
    const { isPending, mutate: registerUser, isSuccess, error } = useRegisterMutation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
    })
    const router = useRouter()

    const onSubmit = async (data: RegisterFormValues) => {
        registerUser(data)
    }

    useEffect(() => {
        if (isSuccess) {
            router.push(paths.login.root)
        }
    }, [isSuccess, router])

    if (isPending) return <FullScreenLoader />

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
            {error && <span className="text-red-500">{error.response?.data?.message}</span>}
        </form>
    )
}

export default RegisterForm
