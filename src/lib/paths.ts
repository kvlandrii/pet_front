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
    chat: {
        root: '/chat',
    },
}
