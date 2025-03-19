import { useDeleteTodoMutation } from '@/api/mutations'
import { paths } from '@/lib/paths'
import { TodoType } from '@/lib/types'
import Link from 'next/link'
import { FC } from 'react'

interface TodoProps {
    todo: TodoType
    order: number
}

const Todo: FC<TodoProps> = ({ todo, order }) => {
    const { mutate: deleteTodo, isPending } = useDeleteTodoMutation()

    return (
        <div className="flex gap-2 p-2 w-full justify-between">
            <span className="text-base">{order}</span>
            <div className="flex gap-2 flex-col w-full">
                <p className="font-bold text-sm">{todo.title}</p>
                <p className="font-medium text-xs line-clamp-2">{todo.description}</p>
                {todo.completed ? (
                    <p className="text-xs text-green-500">Completed</p>
                ) : (
                    <p className="text-xs text-red-500">Not completed</p>
                )}
            </div>
            <div className="flex flex-col gap-2 items-end">
                <Link href={paths.todos.edit(todo.id)} className="text-xs border h-5 px-2">
                    Edit
                </Link>
                <button disabled={isPending} onClick={() => deleteTodo(todo.id)} className="text-xs border h-5 px-2">
                    {isPending ? 'Loading...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}

export default Todo
