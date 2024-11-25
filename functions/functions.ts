const formatDateTime = () => {
    const current = new Date()
    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true }

    const date = current.toLocaleDateString('en-UD', dateOptions)
    const time = current.toLocaleTimeString('en-US', timeOptions);
    return { date, time };
}

export {
    formatDateTime
}