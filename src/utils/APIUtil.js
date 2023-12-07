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
export const CURRENTLY_PLAYING_TRACK = 'https://api.spotify.com/v1/me/player/currently-playing';
export const TRANSFER_PLAYBACK = 'https://api.spotify.com/v1/me/player';
export const SEEK_TO_POSITION = 'https://api.spotify.com/v1/me/player/seek';
export const SKIP_TO_NEXT = 'https://api.spotify.com/v1/me/player/next';
export const SKIP_TO_PREVIOUS = 'https://api.spotify.com/v1/me/player/previous';
export const PLAY = 'https://api.spotify.com/v1/me/player/play';

export const parseResponse = (url, response, replacer='') => {
    let toRet = {};
    switch(url) {
        case USER_LIBRARY :
        case TOP10_USER_LIBRARY :
            toRet = {
                items: response.items.map((item) => {
                    return {
                        id: item.id,
                        image_url: getImageUrl(item.images),
                        name: item.name,
                        type: item.type,
                    }
                })
            }
            break;
        case USER_PROFILE :
            toRet = {
                id: response.id,
                image_url: getImageUrl(response.images),
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
                        image_url: getImageUrl(item.icons),
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
                        image_url: getImageUrl(item.images),
                        type: item.type,
                        context_uri: item.uri,
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
                    image_url: getImageUrl(response.images),
                    type: response.type,
                    context_uri: response.uri,
                    id: response.id,
                },
                items: response.tracks.items.map((item) => {
                    return {
                        id: item.track.id,
                        name: item.track.name,
                        type: item.track.type,
                        artist: item.track.artists[0].name,
                        duration_ms: item.track.duration_ms,
                        image_url: getImageUrl(item.track.album.images),
                        context_uri: item.track.uri,
                    }
                })
            }
            break;
        case getReplacedUrl(ALBUM_TRACKS, replacer) :
            toRet = {
                info:{
                    name: response.name,
                    image_url: getImageUrl(response.images),
                    type: response.type,
                    description: "",
                    context_uri: response.uri,
                    id: response.id,
                },
                items: response.tracks.items.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        artist: item.artists[0].name,
                        type: item.type,
                        duration_ms: item.duration_ms,
                        image_url: getImageUrl(response.images),
                        context_uri: item.uri,
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
                        image_url: getImageUrl(item.album.images),
                        context_uri: item.uri,
                    }
                })
            }
            break;
        case getReplacedUrl(ARTIST, replacer) :
            toRet = {
                id: response.id,
                image_url: getImageUrl(response.images),
                name: response.name,
                context_uri: response.uri,
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
                        context_uri: item.uri,
                    }
                }),
                albums: response.albums.items.map((item) => {
                    return {
                        artist: item.artists[0].name,
                        name: item.name,
                        id: item.id,
                        image_url: getImageUrl(item.images),
                        type: item.type,
                        context_uri: item.uri,
                    }
                }),
                artists: response.artists.items.map((item) => {
                    return {
                        name: item.name,
                        image_url: getImageUrl(item.images),
                        type: item.type,
                        id: item.id,
                        context_uri: item.uri,
                    }
                }),
                playlists: response.playlists.items.map((item) => {
                    return {
                        name: item.name,
                        image_url: getImageUrl(item.images),
                        id: item.id,
                        description: item.description,
                        type: item.type,
                        context_uri: item.uri,
                    }
                })
            }
            break;
        case CURRENTLY_PLAYING_TRACK:
            toRet = {
                id: response.id,
                name: response.name,
                type: response.type,
                duration_ms: response.duration_ms,
                artist: response.artists[0].name,
                image_url: getImageUrl(response.album.images),
            }
            break;
        default:
            return null;
    }
    return toRet;
}

export const post = async (url, body, query=null) => {
    if(getAccessToken() === null) {
        const payload = {
            method: 'POST',
            headers: {
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
    } else {
        url = getUrlWithQuery(url, query);
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${getAccessToken()}`,
            },
            body: body,
        }

        try {
            const data = await fetch(url, payload);
            return Promise.resolve(data);
        } catch (exception) {
            console.log(exception);
            return Promise.reject(exception);
        }
    }

}

export const get = async (url, query=null) => {
    if(getAccessToken() !== null) {
        url = getUrlWithQuery(url, query);
        const payload = {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${getAccessToken()}`,
            }
        }
    
        try {
            const data = await fetch(url, payload);
            if(data.status < 203) {
                return data.json();
            } else {
                return Promise.reject(`Response Code for URL ${url} is ${data.status}`);
            }
        } catch (exception) {
            console.error(exception);
            return Promise.reject(exception);
        }
    }

    return Promise.reject("No Access Token...");
}

export const put = async (url, body, query=null) => {
    if(getAccessToken() !== null) {
        url = getUrlWithQuery(url, query);
        const payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${getAccessToken()}`,
            },
            body: body,
        }

        try {
            const data = await fetch(url, payload);
            return Promise.resolve(data);
        } catch (exception) {
            console.log(exception);
            return Promise.reject(exception);
        }
    }

    return Promise.reject("No Access Token...");
}

const getUrlWithQuery = (url, query) => {
    if(query !== null) {   
        if(url.indexOf('?') !== -1){
            url = `${url}&${query}`;
        } else {
            url = `${url}?${query}`;
        }
    }
    return url;
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