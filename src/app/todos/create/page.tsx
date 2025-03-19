import Loading from '@/app/loading'
import CreateTodoForm from '@/components/forms/CreateTodoForm'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<Loading />}>
                <CreateTodoForm />
            </Suspense>
        </div>
    )
}
