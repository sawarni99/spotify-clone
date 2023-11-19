import './NavBarSongs.css';
import React from 'react'

export default function NavBarSongs({info, sizeState}) {
    let src = '';
    let desc = 'Loading...';
    let name = 'Loading...';
    let pageType = '';

    if(info !== null) {
        src = info.src;
        desc = info.desc;
        name = info.name;
        pageType = info.pageType;
    }

    let style = {}

    switch(sizeState) {
        case 0:
            style = {
                fontSize: 'var(--font-size-large)'
            }
            break;
        case 1:
            style = {
                fontSize: 'var(--font-size-xx-large)'
            }
            break;
        default:
            style = {
                fontSize: 'var(--font-size-xxx-large)'
            }
    }   

    return (
        <div className='nav-bar-songs'>
            <div className="nav-bar-songs-img-container">
                <img src={src} alt='' className='nav-bar-songs-img' />
            </div>
            <div className="nav-bar-songs-info">
                <div style={style} className="nav-bar-songs-name">{name}</div>
                <div className="nav-bar-songs-desc">{desc}</div>
            </div>
        </div>
    )
}
