import { getAccessToken } from "./AuthUtil";

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const TOP10_USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists?limit=10&offset=0';
export const USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists';
export const RECOMMENDATION = 'https://api.spotify.com/v1/recommendations?limit=10&market=IN&seed_genres=indian';
export const USER_PROFILE = 'https://api.spotify.com/v1/me';
export const CATEGORIES = 'https://api.spotify.com/v1/browse/categories';
export const CATEGORY_PLAYLISTS = 'https://api.spotify.com/v1/browse/categories/$/playlists';
export const CATEGORY = 'https://api.spotify.com/v1/browse/categories/$'

export const parseResponse = (url, response, replacer='') => {
    let toRet = {};
    switch(url) {
        case USER_LIBRARY :
        case TOP10_USER_LIBRARY :
            toRet = {
                items: response.items.map((item) => {
                    return {
                        id: item.id,
                        image_url: item.images[0].url,
                        name: item.name,
                        type: item.type,
                    }
                })
            }
            break;
        case USER_PROFILE :
            toRet = {
                id: response.id,
                image_url: response.images[0].url,
                name: response.display_name,
                email: response.email,
                country: response.country,
            }
            break;
        case CATEGORIES :
            toRet = {
                items: response.categories.items.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        image_url: item.icons[0].url
                    }
                })
            }
            break;
        case getReplacedUrl(CATEGORY_PLAYLISTS, replacer) :
            toRet = {
                items: response.playlists.items.map((item) =>{
                    return {
                        id: item.id,
                        description: item.description,
                        name: item.name,
                        image_url: item.images[0].url,
                    }
                })
            }
            break;
        case getReplacedUrl(CATEGORY, replacer) :
            toRet = {
                id: response.id,
                name: response.name,
            }
            break;
        default:
            return null;
    }
    return toRet;
}

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

export const getImageUrl = (images) => {
    if(images === null || images.length === 0 || images[0] === undefined) {
        return "";
    } 

    return images[0].url;
}

export const getReplacedUrl = (url, replacer) => {
    return url.replace('$', replacer);
}