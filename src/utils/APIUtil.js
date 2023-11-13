import { getAccessToken } from "./AuthUtil";

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const TOP10_USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists?limit=10&offset=0';
export const USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists';
export const RECOMMENDATION = 'https://api.spotify.com/v1/recommendations?limit=10&market=IN&seed_genres=indian';
export const USER_PROFILE = 'https://api.spotify.com/v1/me';
export const CATEGORIES = 'https://api.spotify.com/v1/browse/categories';

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

export const get = async (url, query=null) => {
    if(getAccessToken() !== null) {
        if(query !== null) {
            url = `${url}?${query}`;
        }
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

    return Promise.reject("No Access Token...");
}