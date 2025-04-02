import Loading from '@/app/loading'
import EditTodoFormGQL from '@/components/forms/EditTodoFormGQL'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<Loading />}>
                <EditTodoFormGQL />
            </Suspense>
        </div>
    )
}
