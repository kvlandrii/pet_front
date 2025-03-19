import { Suspense } from 'react'
import Loading from './loading'
import PageContent from './PageContent'

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <PageContent />
        </Suspense>
    )
}
