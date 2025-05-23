import RegisterForm from '@/components/forms/RegisterForm'
import { Suspense } from 'react'
import Loading from '../loading'

export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<Loading />}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}
