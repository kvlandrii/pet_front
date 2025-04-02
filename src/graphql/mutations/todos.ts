import { gql } from '@apollo/client'

export const DELETE_TODO = gql`
    mutation DeleteTodoMutation($id: ID!) {
        deleteTodo: deleteTodoMutation(id: $id) {
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

export const UPDATE_TODO = gql`
    mutation UpdateTodoMutation($input: UpdateTodoInput!) {
        updateTodo: updateTodoMutation(input: $input) {
            title
            description
            completed
        }
    }
`
