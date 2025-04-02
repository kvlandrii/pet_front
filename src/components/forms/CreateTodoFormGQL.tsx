'use client'
import Loading from '@/app/loading'
import { CREATE_TODO } from '@/graphql/mutations/todos'
import { GET_TODOS } from '@/graphql/queries/todos'
import { paths } from '@/lib/paths'
import { TodoSchema } from '@/lib/validation'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface CreateTodoFormValues {
    title: string
    description: string
    completed: boolean
}

const CreateTodoFormGQL = () => {
    const router = useRouter()

    const [createTodo, { loading, error }] = useMutation(CREATE_TODO, {
        onCompleted: () => {
            router.push(paths.gqlTodos.root)
        },
        update(cache, { data: { createTodo } }) {
            const { todos } = cache.readQuery({ query: GET_TODOS }) as {
                todos: CreateTodoFormValues[]
            }
            cache.writeQuery({
                query: GET_TODOS,
                data: { todos: [...todos, createTodo] },
            })
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateTodoFormValues>({ resolver: zodResolver(TodoSchema) })

    const onSubmit = async (data: CreateTodoFormValues) => {
        createTodo({ variables: { input: data } })
    }

    if (loading) return <Loading />

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
                {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            {error && <span className="text-red-500">{error.message}</span>}
        </form>
    )
}

export default CreateTodoFormGQL
