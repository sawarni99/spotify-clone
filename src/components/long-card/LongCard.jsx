import PlayButton from '../play-button/PlayButton'
import './LongCard.css'
import React from 'react'

export default function LongCard({src, name, onClick}) {

    if(name === undefined || name === null) name = 'Loading...'

    const onClickPlay = (event) => {
        event.stoppropagation();
        // Logic for play button...
    }

    return (
        <div className='long-card' onClick={onClick}>
            <div className="long-card-img-container">
                <img className='long-card-img' src={src} alt='' />
            </div>
            <div className="long-card-name">
                {name}
                <div className="long-card-play">
                    <PlayButton onClick={onClickPlay}/>
                </div>
            </div>
        </div>
    )
}
