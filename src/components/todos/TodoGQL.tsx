import { DELETE_TODO } from '@/graphql/mutations/todos'
import { GET_TODOS } from '@/graphql/queries/todos'
import { paths } from '@/lib/paths'
import { TodoType } from '@/lib/types'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { FC } from 'react'

interface TodoProps {
    todo: TodoType
    order: number
}

const TodoGQL: FC<TodoProps> = ({ todo, order }) => {
    const [deleteTodoMutation, { loading }] = useMutation(DELETE_TODO, {
        variables: { id: todo.id },
        update(cache) {
            const { todos } = cache.readQuery({ query: GET_TODOS }) as {
                todos: TodoType[]
            }
            const newTodos = todos.filter((t) => t.id !== todo.id)
            cache.writeQuery({
                query: GET_TODOS,
                data: { todos: newTodos },
            })
        },
    })

    return (
        <div className="flex gap-2 p-2 w-full justify-between">
            <span className="text-base">{order}</span>
            <div className="flex gap-2 flex-col w-full">
                <p className="font-bold text-sm">{todo.title}</p>
                <p className="font-medium text-xs line-clamp-2">
                    {todo.description}
                </p>
                {todo.completed ? (
                    <p className="text-xs text-green-500">Completed</p>
                ) : (
                    <p className="text-xs text-red-500">Not completed</p>
                )}
            </div>
            <div className="flex flex-col gap-2 items-end">
                <Link
                    href={paths.gqlTodos.edit(todo.id)}
                    className="text-xs border h-5 px-2"
                >
                    Edit
                </Link>
                <button
                    disabled={loading}
                    onClick={() => deleteTodoMutation()}
                    className="text-xs border h-5 px-2"
                >
                    {loading ? 'Loading...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}

export default TodoGQL
