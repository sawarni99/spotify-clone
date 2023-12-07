import './Card.css';
import React from 'react'
import PlayButton from '../play-button/PlayButton';
import { getShortMessage } from '../../utils/Helper';
import { PLAY, getBodyForSongPlay, put } from '../../utils/ApiUtil';

export default function Card({src, name, desc, onClick, plain, uri}) {

    if(src === undefined || src === null) src = ''
    if(name === undefined || name === null) name = 'Loading...'
    if(desc === undefined || desc === null) desc = 'Loading...'

    const onClickPlay = (event) => {
        event.stopPropagation();
        
        if(!uri) return;
        put(PLAY, getBodyForSongPlay(uri));
    }

    let className = 'card';
    if(plain) {
        className = 'card-plain';
    }

    return (
        <div className={className} onClick={onClick}>
            <div className="card-img-container">
                <img src={src} alt="" className="card-img" />
                <div className='card-play-button'>
                    <PlayButton onClick={onClickPlay} />
                </div>
            </div>
            <div className="card-name">
                {getShortMessage(name)}
            </div>
            <div className="card-desc">
                {getShortMessage(desc)}
            </div>
        </div>
    )
}
