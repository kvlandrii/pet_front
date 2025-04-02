import { gql } from '@apollo/client'

export const DELETE_TODO = gql`
    mutation DeleteTodoMutation($id: ID!) {
        deleteTodoMutation(id: $id) {
            id
            title
            description
            completed
        }
    }
`

export const CREATE_TODO = gql`
    mutation LoginUserMutation($input: CreateTodoInput!) {
        createTodo: createTodoMutation(input: $input) {
            title
            id
            description
            completed
        }
    }
`
