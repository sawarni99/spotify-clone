import { getAccessToken } from "./AuthUtil";

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const TOP10_USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists?limit=10&offset=0';
export const USER_LIBRARY = 'https://api.spotify.com/v1/me/playlists';
export const RECOMMENDATION = 'https://api.spotify.com/v1/recommendations?limit=10&market=IN&seed_genres=indian';
export const SEARCH = 'https://api.spotify.com/v1/search';
export const USER_PROFILE = 'https://api.spotify.com/v1/me';
export const CATEGORIES = 'https://api.spotify.com/v1/browse/categories';
export const CATEGORY_PLAYLISTS = 'https://api.spotify.com/v1/browse/categories/$/playlists';
export const CATEGORY = 'https://api.spotify.com/v1/browse/categories/$';
export const ARTIST_TOP_TRACKS = 'https://api.spotify.com/v1/artists/$/top-tracks';
export const ALBUM_TRACKS = 'https://api.spotify.com/v1/albums/$';
export const PLAYLIST_TRACKS = 'https://api.spotify.com/v1/playlists/$';
export const ARTIST = 'https://api.spotify.com/v1/artists/$';

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
                        type: item.type,
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
        case getReplacedUrl(PLAYLIST_TRACKS, replacer) :
            toRet = {
                info: {
                    description: response.description,
                    name: response.name,
                    image_url: response.images[0].url,
                    type: response.type,  
                },
                items: response.tracks.items.map((item) => {
                    return {
                        id: item.track.id,
                        name: item.track.name,
                        type: item.track.type,
                        artist: item.track.artists[0].name,
                        duration_ms: item.track.duration_ms,
                        image_url: item.track.album.images[0].url,
                    }
                })
            }
            break;
        case getReplacedUrl(ALBUM_TRACKS, replacer) :
            toRet = {
                info:{
                    name: response.name,
                    image_url: response.images[0].url,
                    type: response.type,
                    description: "",
                },
                items: response.tracks.items.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        artist: item.artists[0].name,
                        type: item.type,
                        duration_ms: item.duration_ms,
                        image_url: response.images[0].url,
                    }
                })
            }
            break;
        case getReplacedUrl(ARTIST_TOP_TRACKS, replacer) :
            toRet = {
                items: response.tracks.map((item) => {
                    return {
                        id: item.id,
                        duration_ms: item.duration_ms,
                        name: item.name,
                        type: item.type,
                        artist: item.artists[0].name,
                        image_url: item.album.images[0].url,
                    }
                })
            }
            break;
        case getReplacedUrl(ARTIST, replacer) :
            toRet = {
                id: response.id,
                image_url: response.images[0].url,
                name: response.name,
            }
            break;
        case SEARCH :
            toRet = {	
                tracks: response.tracks.items.map((item) => {
                    return {
                        artist : item.artists[0].name,
                        album : item.album.name,
                        id: item.id,
                        image_url: getImageUrl(item.album.images),
                        type: item.type,
                        duration_ms: item.duration_ms,
                        name: item.name,
                    }
                }),
                albums: response.albums.items.map((item) => {
                    return {
                        artist: item.artists[0].name,
                        name: item.name,
                        id: item.id,
                        image_url: getImageUrl(item.images),
                        type: item.type,
                    }
                }),
                artists: response.artists.items.map((item) => {
                    return {
                        name: item.name,
                        image_url: getImageUrl(item.images),
                        type: item.type,
                        id: item.id,
                    }
                }),
                playlists: response.playlists.items.map((item) => {
                    return {
                        name: item.name,
                        image_url: getImageUrl(item.images),
                        id: item.id,
                        description: item.description,
                        type: item.type,
                    }
                })
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
            if(url.indexOf('?') !== -1){
                url = `${url}&${query}`;
            } else {
                url = `${url}?${query}`;
            }
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
    if(url !== null) return url.replace('$', replacer);

    return "";
}