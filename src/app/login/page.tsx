import LoginForm from '@/components/forms/LoginForm'
import { Suspense } from 'react'
import Loading from '../loading'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Suspense fallback={<Loading />}>
                <LoginForm />
            </Suspense>
        </div>
    )
}
