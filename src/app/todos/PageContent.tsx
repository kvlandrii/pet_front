'use client'

import { useTodosQuery } from '@/api/queries'
import Loading from '../loading'
import Todo from '@/components/todos/Todo'
import { TodoType } from '@/lib/types'
import Link from 'next/link'
import { paths } from '@/lib/paths'

const PageContent = () => {
    const { data: todos, isPending, isError, error } = useTodosQuery()

    if (isPending) return <Loading />
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <div className="flex items-center justify-center w-full py-10">
            <div className="w-[500px] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <Link href={paths.todos.create} className="border p-2">
                        Create new
                    </Link>
                </div>
                <div className="flex flex-col gap-3">
                    {todos?.map((todo: TodoType, index: number) => (
                        <Todo key={todo.id} todo={todo} order={index + 1} />
                    ))}
                    {todos?.length === 0 && <p>No todos found</p>}
                </div>
            </div>
        </div>
    )
}

export default PageContent
