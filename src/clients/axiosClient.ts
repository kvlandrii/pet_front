import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosClient
