import Loading from '@/app/loading'
import EditTodoForm from '@/components/forms/EditTodoForm'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<Loading />}>
                <EditTodoForm />
            </Suspense>
        </div>
    )
}
