'use client'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface AuthContextType {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
    registerUser: (name: string, email: string, password: string) => Promise<void>
    loginUser: (email: string, password: string) => Promise<void>
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const id: { id: string } = jwtDecode(token)
                    const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    setUser(res.data)
                } catch (error) {
                    console.error('Error fetching user:', error)
                    logoutUser()
                }
            }
        }

        fetchUser()
    }, [])

    const registerUser = async (name: string, email: string, password: string) => {
        try {
            await axios.post('http://localhost:8080/api/user/register', {
                name,
                email,
                password,
            })
            router.push('/login')
            //eslint-disable-next-line
        } catch (error: any) {
            console.error(error.response?.data?.message || 'Registration failed')
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            const res = await axios.post('http://localhost:8080/api/user/login', {
                email,
                password,
            })
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            router.push('/')
            //eslint-disable-next-line
        } catch (error: any) {
            console.error(error.response?.data?.message || 'Login failed')
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/')
    }

    return <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}
