'use client'

import { useAuth } from '@/hook/useAuth'

const PageContent = () => {
    const { user } = useAuth()
    return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default PageContent
