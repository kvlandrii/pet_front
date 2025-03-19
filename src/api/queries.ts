import axiosClient from '@/clients/axiosClient'
import { TodoType, UserType } from '@/lib/types'
import { setUser, logout } from '@/redux/slices/authSlice'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export const useUserQuery = () => {
    const dispatch = useDispatch()

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get(`/user/me`)
                dispatch(setUser(res.data))
                return res.data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        dispatch(logout())
                        return null
                    }
                }
                throw error
            }
        },
    })
}

export const useTodosQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get<{ todos: TodoType[] }>(
                    '/todos'
                )
                return res.data.todos
            } catch (error) {
                console.error('Error fetching todos:', error)
                return null
            }
        },
    })
}

export const useTodoQuery = (id: string) => {
    return useQuery({
        queryKey: ['todo', id],
        queryFn: async () => {
            try {
                const res = await axiosClient.get<{ todo: TodoType }>(
                    `/todos/${id}`
                )
                return res.data.todo
            } catch (error) {
                console.error('Error fetching todo:', error)
                return null
            }
        },
    })
}

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get<{ users: UserType[] }>(
                    '/users/all'
                )
                return res.data.users
            } catch (error) {
                console.error('Error fetching users:', error)
                return null
            }
        },
    })
}
