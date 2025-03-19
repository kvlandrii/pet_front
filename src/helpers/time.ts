export const time = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()

    const isSameYear = date.getFullYear() === now.getFullYear()
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)

    const isYesterday = 
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()

    const isEarlier = date < yesterday

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    }

    if (isYesterday) {
        return `yesterday, ${date.toLocaleTimeString([], options)}`
    }

    if (isEarlier) {
        options.day = '2-digit'
        options.month = 'short'
        if (!isSameYear) {
            options.year = 'numeric'
        }
    }

    return date.toLocaleString([], options)
}
