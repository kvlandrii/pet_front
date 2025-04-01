import { gql } from '@apollo/client'

export const GET_TODOS = gql`
    query GetTodosQuery {
        todos: getTodosQuery {
            id
            title
            description
            completed
        }
    }
`
