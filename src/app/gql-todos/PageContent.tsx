'use client'

import Link from 'next/link'
import { paths } from '@/lib/paths'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '@/graphql/queries/todos'
import Loading from '../loading'
import { TodoType } from '@/lib/types'
import TodoGQL from '@/components/todos/TodoGQL'

const PageContent = () => {
    const { data, loading, error } = useQuery(GET_TODOS)

    if (loading) return <Loading />
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <div className="flex items-center justify-center w-full py-10">
            <div className="w-[500px] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <Link href={paths.todos.create} className="border p-2">
                        Create new
                    </Link>
                </div>
                <div className="flex flex-col gap-3">
                    {data?.todos.map((todo: TodoType, index: number) => (
                        <TodoGQL key={todo.id} todo={todo} order={index + 1} />
                    ))}
                    {data?.todos.length === 0 && <p>No todos found</p>}
                </div>
            </div>
        </div>
    )
}

export default PageContent
