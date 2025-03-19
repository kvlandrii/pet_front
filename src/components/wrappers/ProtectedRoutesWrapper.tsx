// ProtectedRoutesWrapper.tsx
'use client'
import { useAuth } from '@/hook/useAuth'
import { paths } from '@/lib/paths'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import FullScreenLoader from '../loaders/FullScreenLoader'

const ProtectedRoutesWrapper = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const isProtectedRoute = pathname.startsWith(paths.user.root)

    useEffect(() => {
        if (!isLoading && !user && isProtectedRoute) {
            router.push(paths.login.root)
        }
    }, [user, isLoading, isProtectedRoute, router])

    if (isLoading) return <FullScreenLoader />

    return <>{children}</>
}

export default ProtectedRoutesWrapper
