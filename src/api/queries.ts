import { USER_API_URL } from '@/lib/variables'
import { setUser, logout } from '@/redux/slices/authSlice'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
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
                const res = await axios.get(`${USER_API_URL}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })

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
