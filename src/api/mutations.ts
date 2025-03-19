import { queryClient } from '@/clients/queryClient'
import { USER_API_URL } from '@/lib/variables'
import { setUser } from '@/redux/slices/authSlice'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'

export const useLoginMutation = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const res = await axios.post(`${USER_API_URL}/login`, { email, password })
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
        mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
            const res = await axios.post(`${USER_API_URL}/register`, { name, email, password })
            return res.data
        },
        onError: (error: AxiosError<{ message: string }>) => error,
    })
}
