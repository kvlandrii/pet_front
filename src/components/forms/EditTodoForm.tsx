'use client'
import { useUpdateTodoMutation } from '@/api/mutations'
import { useTodoQuery } from '@/api/queries'
import Loading from '@/app/loading'
import { paths } from '@/lib/paths'
import { TodoSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface EditTodoFormValues {
    title: string
    description: string
    completed: boolean
}

const EditTodoForm = () => {
    const router = useRouter()
    const { id: todoId }: { id: string } = useParams()
    const { data: todo, isPending: todoPending } = useTodoQuery(todoId)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EditTodoFormValues>({
        resolver: zodResolver(TodoSchema),
    })
    const { mutate: updateTodo, isPending: updateTodoPending, error, isSuccess } = useUpdateTodoMutation()

    const onSubmit = async (data: EditTodoFormValues) => {
        updateTodo({ id: todoId, ...data })
    }

    useEffect(() => {
        if (todo) {
            setValue('title', todo.title)
            setValue('description', todo.description)
            setValue('completed', todo.completed)
        }
    }, [todo, setValue, register])

    useEffect(() => {
        if (isSuccess) {
            router.push(paths.todos.root)
        }
    }, [isSuccess, router])

    if (todoPending || updateTodoPending) return <Loading />

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
                {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            {error && <span className="text-red-500">{error.response?.data?.message}</span>}
        </form>
    )
}

export default EditTodoForm
