export const time = (dateString: string) => {
    const date = new Date(dateString)
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })
    return formattedTime
}
