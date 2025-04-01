export const getToken = () => {
    if (typeof window === 'undefined') {
        return null
    }
    const token = localStorage.getItem('token')
    return token ? `Bearer ${token}` : null
}
