'use client'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { paths } from '@/lib/paths'

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    registerUser: (name: string, email: string, password: string) => void
    loginUser: (email: string, password: string) => void
    logoutUser: () => void
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            if (!token) return null

            try {
                const { id } = jwtDecode<{ id: string }>(token)
                const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return res.data
            } catch (error) {
                console.error('Error fetching user:', error)
                logoutUser()
                return null
            }
        },
    })

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const res = await axios.post('http://localhost:8080/api/user/login', { email, password })
            localStorage.setItem('token', res.data.token)
            return res.data.user
        },
        onSuccess: (user) => {
            queryClient.setQueryData(['authUser'], user)
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
            router.push(paths.root)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            console.error(error.response?.data?.message || 'Login failed')
        },
    })

    const registerMutation = useMutation({
        mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
            const res = await axios.post('http://localhost:8080/api/user/register', { name, email, password })
            return res.data.user
        },
        onSuccess: () => {
            router.push(paths.login.root)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            console.error(error.response?.data?.message || 'Registration failed')
        },
    })

    const logoutUser = useCallback(() => {
        localStorage.removeItem('token')
        queryClient.setQueryData(['authUser'], null)
        router.push(paths.login.root)
    }, [queryClient, router])

    return (
        <AuthContext.Provider
            value={{
                user,
                registerUser: (name, email, password) => registerMutation.mutate({ name, email, password }),
                loginUser: (email, password) => loginMutation.mutate({ email, password }),
                logoutUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
