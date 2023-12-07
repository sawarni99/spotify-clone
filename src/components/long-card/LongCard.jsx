import { PLAY, getBodyForSongPlay, put } from '../../utils/ApiUtil'
import PlayButton from '../play-button/PlayButton'
import './LongCard.css'
import React from 'react'

export default function LongCard({src, name, onClick, plain, noDesc, onMouseOver, uri}) {

    if(name === undefined || name === null) name = 'Loading...'

    const onClickPlay = (event) => {
        event.stopPropagation();
        console.log("here", uri);
        if(!uri) return;

        put(PLAY, getBodyForSongPlay(uri));
    }

    let className = 'long-card'
    if(plain) {
        className = 'long-card-plain';
    }

    return (
        <div className={className} onClick={onClick} onMouseOver={onMouseOver}>
            <div className="long-card-img-container">
                <img className='long-card-img' src={src} alt='' />
            </div>
            {
                !noDesc && 
                <div className="long-card-name">
                    {name}
                    <div className="long-card-play">
                        <PlayButton onClick={onClickPlay}/>
                    </div>
                </div>
            }
        </div>
    )
}
