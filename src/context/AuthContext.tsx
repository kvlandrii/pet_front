'use client'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'

interface AuthContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
    registerUser: (name: string, email: string, password: string) => Promise<void>
    loginUser: (email: string, password: string) => Promise<void>
    logoutUser: () => void
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const registerUser = async (name: string, email: string, password: string) => {
        try {
            await axios.post('http://localhost:8080/api/user/register', { name, email, password })
            router.push('/login')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.response?.data?.message || 'Registration failed')
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            const res = await axios.post('http://localhost:8080/api/user/login', { email, password })
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            router.push('/')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.response?.data?.message || 'Login failed')
        }
    }

    const logoutUser = useCallback(() => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/')
    }, [router])

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const { id } = jwtDecode<{ id: string }>(token)
                    const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    setUser(res.data)
                } catch (error) {
                    console.error('Error fetching user:', error)
                    logoutUser()
                }
            }
            setIsLoading(false)
        }

        fetchUser()
    }, [logoutUser])

    return (
        <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
