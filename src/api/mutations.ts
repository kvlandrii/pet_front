import axiosClient from '@/clients/axiosClient'
import { queryClient } from '@/clients/queryClient'
import { setUser } from '@/redux/slices/authSlice'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'

export const useLoginMutation = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const res = await axiosClient.post(`/user/login`, { email, password })
            return { user: res.data.user, token: res.data.token }
        },
        onSuccess: ({ user, token }) => {
            localStorage.setItem('token', token)
            queryClient.setQueryData(['user'], user)
            dispatch(setUser(user))
        },
        onError: (error: AxiosError<{ message: string }>) => error,
    })
}

export const useRegisterMutation = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: async (data: { name: string; email: string; password: string }) => {
            const res = await axiosClient.post(`/user/register`, data)
            return res.data
        },
        onError: (error: AxiosError<{ message: string }>) => error,
    })
}

export const useDeleteTodoMutation = () => {
    return useMutation({
        mutationKey: ['deleteTodo'],
        mutationFn: async (id: string) => {
            const res = await axiosClient.delete(`/todos/delete/${id}`)
            return res.data
        },
        onError: (error: AxiosError<{ message: string }>) => error,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
}

export const useCreateTodoMutation = () => {
    return useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (data: { title: string; description: string; completed: boolean }) => {
            const res = await axiosClient.post(`/todos/create`, data)
            return res.data
        },
        onError: (error: AxiosError<{ message: string }>) => error,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
}

export const useUpdateTodoMutation = () => {
    return useMutation({
        mutationKey: ['updateTodo'],
        mutationFn: async (data: { id: string; title: string; description: string; completed: boolean }) => {
            const res = await axiosClient.put(`/todos/update/${data.id}`, data)
            return res.data
        },
        onError: (error: AxiosError<{ message: string }>) => error,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
}
