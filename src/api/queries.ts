import axiosClient from '@/clients/axiosClient'
import { TodoType } from '@/lib/types'
import { setUser, logout } from '@/redux/slices/authSlice'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'

export const useUserQuery = () => {
    const dispatch = useDispatch()

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            if (!token) return null

            try {
                const { id } = jwtDecode<{ id: string }>(token)
                const res = await axiosClient.get(`/user/${id}`)
                dispatch(setUser(res.data))
                return res.data
            } catch (error) {
                console.error('Error fetching user:', error)
                dispatch(logout())
                return null
            }
        },
    })
}

export const useTodosQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get<{ todos: TodoType[] }>('/todos')
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
                const res = await axiosClient.get<{ todo: TodoType }>(`/todos/${id}`)
                return res.data.todo
            } catch (error) {
                console.error('Error fetching todo:', error)
                return null
            }
        },
    })
}

