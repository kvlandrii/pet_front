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
