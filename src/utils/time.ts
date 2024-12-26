const formatTime = (dateString: string, isChat?: boolean) => {
    const date = new Date(dateString);
    const now = new Date();

    now.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    if (isChat) {
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (date < startOfWeek) {
            return date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
        }
        return date.toLocaleDateString([], { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    }
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (date >= startOfWeek) {
        return date.toLocaleDateString([], { weekday: 'long' });
    }
    if (date < startOfWeek) {
        return date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return date.toLocaleDateString([], { day: 'numeric', month: 'long' });
}

export default formatTime;
