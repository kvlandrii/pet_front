import { ReactNode } from 'react'
import Header from '../header/Header'

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col w-full h-svh">
            <Header />
            <main className="h-[calc(100svh-40px)] flex flex-col w-full">{children}</main>
        </div>
    )
}

export default AppLayout
