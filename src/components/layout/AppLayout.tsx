import { ReactNode } from 'react'
import Header from '../header/Header'

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col w-full h-screen">
            <Header />
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
