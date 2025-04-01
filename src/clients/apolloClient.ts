import { config } from '@/configs/env'
import { getToken } from '@/helpers/getToken'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: config.graphqlUrl,
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: getToken(),
        },
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
