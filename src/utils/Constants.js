export const INITIAL_INDEX = 1;
export const MIN_WIDTH_MAIN = 400;

export const sizeInterval = [
    {min: 72, max: 72}, 
    {min: 280, max: 420}, 
    {min: 584, max: 1096}
];

export const widthStates = {
    small: 0,
    medium: 1,
    large: 2,
}

export const pages = {
    home: '/',
    search: '/search',
    album: '/album',
    playlist: '/playlist',
    artist: '/artist',
    login: '/login'
}

export const profileMenuList = [
    {
        key: 'account',
        name: 'Account'
    },
    {
        key: 'logout',
        name: 'Log out'
    }
]