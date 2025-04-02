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
        delete: `/todos/delete`,
        edit: (id: string) => `/todos/edit/${id}`,
    },
    gqlTodos: {
        root: '/gql-todos',
        create: '/gql-todos/create',
    },
    chat: {
        root: '/chat',
    },
}
