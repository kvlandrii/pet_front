'use client'

import { useAuth } from '@/hook/useAuth'

export default function Page() {
    const { user } = useAuth()
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
