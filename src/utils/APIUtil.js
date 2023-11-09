import { getAccessToken } from "./AuthUtil";

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const TOP10_USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists?limit=10&offset=0';

export const post = async (url, body) => {
    const payload = {
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body),
    }

    try {
        const data = await fetch(url, payload);
        return data.json();
    } catch(exception) {
        console.log(exception);
        return Promise.reject(exception);
    }

}

export const get = async (url) => {
    const payload = {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${getAccessToken()}`,
        }
    }

    try {
        const data = await fetch(url, payload);
        return data.json();
    } catch (exception) {
        console.log(exception);
        return Promise.reject(exception);
    }
}