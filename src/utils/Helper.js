
export const getGreetings = () => {
    const now = new Date();
    const hour = now.getHours();

    if(hour < 12) return 'Good morning';
    if(hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export const getFormattedTime = (seconds) => {
    if(seconds < 0) {
        return '00:00'
    }

    const sec = Math.ceil(seconds % 60);
    const min = Math.floor(seconds / 60);
    let time = '';
    time += `${min}:`

    if(sec < 10) {
        time += `0${sec}`
    }else {
        time += `${sec}`
    }
    return time;
}