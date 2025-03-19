'use client'

import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export default function Page() {
    const user = useSelector((state: RootState) => state.auth.user)
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
