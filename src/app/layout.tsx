import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoutesProvider from '@/components/providers/ProtectedRoutesProvider'
import ReactQueryProvider from '@/components/providers/QueryProvider'
import ReduxProvider from '@/components/providers/ReduxProvider'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ReduxProvider>
                    <ReactQueryProvider>
                        <ProtectedRoutesProvider>
                            <AppLayout>{children}</AppLayout>
                        </ProtectedRoutesProvider>
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}
