'use client'
import { apolloClient } from '@/clients/apolloClient'
import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { ReactNode } from 'react'

const ApolloProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ApolloClientProvider client={apolloClient}>
            {children}
        </ApolloClientProvider>
    )
}

export default ApolloProvider
