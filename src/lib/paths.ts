export const paths = {
    root: '/',
    login: {
        root: '/login',
    },
    register: {
        root: '/register',
    },
    user: {
        root: '/user',
    },
    todos: {
        root: '/todos',
        create: '/todos/create',
        edit: (id: string) => `/todos/edit/${id}`,
    },
    gqlTodos: {
        root: '/gql-todos',
        create: '/gql-todos/create',
        edit: (id: string) => `/gql-todos/edit/${id}`,
    },
    chat: {
        root: '/chat',
    },
}
