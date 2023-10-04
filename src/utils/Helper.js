
export const getGreetings = () => {
    const now = new Date();
    const hour = now.getHours();

    if(hour < 12) return 'Good morning';
    if(hour < 17) return 'Good afternoon';
    return 'Good evening';
}