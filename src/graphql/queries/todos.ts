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

export const GET_TODO = gql`
    query GetMeQuery($id: ID!) {
        todo: getTodoByIdQuery(id: $id) {
            title
            description
            completed
        }
    }
`
