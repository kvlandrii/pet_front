// ProtectedRoutesWrapper.tsx
'use client'
import { paths } from '@/lib/paths'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import FullScreenLoader from '../loaders/FullScreenLoader'
import { useUserQuery } from '@/api/queries'

const ProtectedRoutesProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, isLoading } = useUserQuery()
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

export default ProtectedRoutesProvider
