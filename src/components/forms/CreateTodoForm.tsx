'use client'
import { useCreateTodoMutation } from '@/api/mutations'
import Loading from '@/app/loading'
import { paths } from '@/lib/paths'
import { TodoSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface CreateTodoFormValues {
    title: string
    description: string
    completed: boolean
}

const CreateTodoForm = () => {
    const { mutate: createTodo, isPending, error, isSuccess } = useCreateTodoMutation()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateTodoFormValues>({ resolver: zodResolver(TodoSchema) })

    const onSubmit = async (data: CreateTodoFormValues) => {
        createTodo(data)
    }

    useEffect(() => {
        if (isSuccess) {
            router.push(paths.todos.root)
        }
    }, [isSuccess, router])

    if (isPending) return <Loading />

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[400px]">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Title:</label>
                <input
                    type="title"
                    className="outline-none border border-white"
                    placeholder="Title"
                    {...register('title')}
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Description:</label>
                <textarea
                    className="outline-none border border-white resize-none h-[100px]"
                    placeholder="Description"
                    {...register('description')}
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="name">Completed:</label>
                <input type="checkbox" {...register('completed')} />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black disabled:bg-gray-200 disabled:text-gray-400"
            >
                {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            {error && <span className="text-red-500">{error.response?.data?.message}</span>}
        </form>
    )
}

export default CreateTodoForm
