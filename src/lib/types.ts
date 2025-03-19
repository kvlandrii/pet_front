export type UserType = {
    id: string | null
    name: string | null
    email: string | null
}

export type TodoType = {
    id: string
    title: string
    description: string
    completed: boolean
}

export type MessageType = {
    id: string
    content: string
    sender: UserType
    createdAt: string
}
