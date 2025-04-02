import Loading from '@/app/loading'
import CreateTodoFormGQL from '@/components/forms/CreateTodoFormGQL'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<Loading />}>
                <CreateTodoFormGQL />
            </Suspense>
        </div>
    )
}
