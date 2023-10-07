import './Card.css';
import React from 'react'
import PlayButton from '../play-button/PlayButton';

export default function Card({src, name, desc, onClick, plain}) {

    if(src === undefined || src === null) src = ''
    if(name === undefined || name === null) name = 'Loading...'
    if(desc === undefined || desc === null) desc = 'Loading...'

    const onClickPlay = (event) => {
        event.stopPropagation();
        // Logic for play the album/artist/playlist...
    }

    let className = 'card';
    if(plain) {
        className = 'card-plain';
    }

    return (
        <div className={className} onClick={onClick}>
            <div className="card-img-container">
                <img src="" alt="" className="card-img" />
                <div className='card-play-button'>
                    <PlayButton onClick={onClickPlay} />
                </div>
            </div>
            <div className="card-name">
                {name}
            </div>
            <div className="card-desc">
                {desc}
            </div>
        </div>
    )
}
