'use client'
import Loading from '@/app/loading'
import { UPDATE_TODO } from '@/graphql/mutations/todos'
import { GET_TODO, GET_TODOS } from '@/graphql/queries/todos'
import { paths } from '@/lib/paths'
import { TodoType } from '@/lib/types'
import { TodoSchema } from '@/lib/validation'
import { useMutation, useQuery } from '@apollo/client'
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
    const { data, loading } = useQuery(GET_TODO, {
        variables: { id: todoId },
    })
    const [updateTodo, { loading: updateTodoLoading, error }] = useMutation(
        UPDATE_TODO,
        {
            update(cache, { data: { updateTodo } }) {
                const { todos } = cache.readQuery({ query: GET_TODOS }) as {
                    todos: TodoType[]
                }
                const updatedTodos = todos.map((todo) =>
                    todo.id === todoId ? { ...todo, ...updateTodo } : todo
                )
                cache.writeQuery({
                    query: GET_TODO,
                    variables: { id: todoId },
                    data: { todo: updateTodo },
                })
                cache.writeQuery({
                    query: GET_TODOS,
                    data: { todos: updatedTodos },
                })
            },
            onCompleted: () => {
                router.push(paths.gqlTodos.root)
            },
        }
    )

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EditTodoFormValues>({
        resolver: zodResolver(TodoSchema),
    })

    const onSubmit = async (data: EditTodoFormValues) => {
        updateTodo({ variables: { input: { id: todoId, ...data } } })
    }

    useEffect(() => {
        if (data?.todo) {
            setValue('title', data.todo.title)
            setValue('description', data.todo.description)
            setValue('completed', data.todo.completed)
        }
    }, [data, setValue, register])

    if (loading || updateTodoLoading) return <Loading />

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-[400px]"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Title:</label>
                <input
                    type="title"
                    className="outline-none border border-white"
                    placeholder="Title"
                    {...register('title')}
                />
                {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Description:</label>
                <textarea
                    className="outline-none border border-white resize-none h-[100px]"
                    placeholder="Description"
                    {...register('description')}
                />
                {errors.description && (
                    <span className="text-red-500">
                        {errors.description.message}
                    </span>
                )}
            </div>
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="name">Completed:</label>
                <input type="checkbox" {...register('completed')} />
                {errors.description && (
                    <span className="text-red-500">
                        {errors.description.message}
                    </span>
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black disabled:bg-gray-200 disabled:text-gray-400"
            >
                {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            {error && <span className="text-red-500">{error.message}</span>}
        </form>
    )
}

export default EditTodoForm
