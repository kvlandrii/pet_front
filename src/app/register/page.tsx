import RegisterForm from '@/components/forms/RegisterForm'
import { Suspense } from 'react'
import Loading from '../loading'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Suspense fallback={<Loading />}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}
