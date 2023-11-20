export const CLIENT_ID = 'd7031b3133c041f79b03de1fe8928c90';
export const REDIRECT_URL = 'http://localhost:3000';
export const ACCESS_TOKEN_KEY = 'spotify_access_token';
export const REFRESH_TOKEN_KEY = 'spotify_refresh_token';
export const EXPIRES_IN_KEY = 'spotify_expires_in';
export const CODE_VERIFIER_KEY = 'spotify_code_verifier';
export const COUNTRY_KEY = 'country';
export const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'user-read-playback-position',
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    'user-library-modify',
    'user-library-read',
];  

export const getAccessToken = () => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if(accessToken === null || accessToken === '') {
        return null;
    }

    return accessToken;
}

export const setAccessToken = (accessToken) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export const getRefreshToken = () => {
    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
    if(refreshToken === null || refreshToken === '') {
        return null;
    }

    return refreshToken;
}

export const setRefreshToken = (refreshToken) => {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export const setExpiresIn = (expiresIn) => {
    if(typeof expiresIn === 'number') {
        window.localStorage.setItem(EXPIRES_IN_KEY, expiresIn.toString())
    }else {
        window.localStorage.setItem(EXPIRES_IN_KEY, expiresIn)
    }
}

export const getExpiresIn = () => {
    const expiresIn = window.localStorage.getItem(EXPIRES_IN_KEY);
    if(expiresIn === null || expiresIn === '') {
        return null;
    }

    if(typeof expiresIn === 'number') {
        return expiresIn
    }

    return parseInt(expiresIn)
}

export const logout = () => {
    window.localStorage.removeItem(CODE_VERIFIER_KEY);
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_IN_KEY);
    window.localStorage.removeItem('timestamp');
    window.localStorage.removeItem(COUNTRY_KEY);
    window.location.href = REDIRECT_URL;
}