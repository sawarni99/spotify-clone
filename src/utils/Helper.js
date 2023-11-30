import { alphabetColorMap, pages } from "./Constants";

export const getGreetings = () => {
    const now = new Date();
    const hour = now.getHours();

    if(hour < 12) return 'Good morning';
    if(hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
}

export const removeLocalStorage = (key) => {
    window.localStorage.removeItem(key);
}

export const getLocalStorage = (key) => {
    return window.localStorage.getItem(key);
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

export const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}

export const getColorByName = (name) => {
    if(typeof name !== 'string' || name.length <= 0) {
        return "#282828";
    }

    return alphabetColorMap[name[0]];

}

export const getShortMessage = (message, threshold=15) => {
    if(message.length >= threshold){
        return `${message.substring(0, threshold)}...`;
    }

    return message;
}

export const getPageFromType = (type) => {
    switch(type) {
        case 'playlist':
            return pages.playlist;
        case 'album':
            return pages.album;
        case 'artist':
            return pages.artist;
        default:
            return '/'
    }
}