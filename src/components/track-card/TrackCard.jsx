import Icon from '../icon/Icon'
import './TrackCard.css'
import React from 'react'

export default function({src, name, artist, duration}) {

    if(src === undefined || src === null) src=''
    if(name === undefined || name === null) name='Loading...'
    if(artist === undefined || artist === null) artist='Loading..'
    if(duration === undefined || duration === null) duration='0:00'

    const onClickOptions = () => {
        // Logic to see options...
    }

    const onClickPlay = () => {
        // Logic to play song...
    }

    return (
        <div className='track-card'>
            <div onClick={onClickPlay} className="track-card-img-container">
                <img src="" alt="" className="track-card-img" />
            </div>
            <div className="track-card-desc">
                <div className="track-card-name">{name}</div>
                <div className="track-card-artist">{artist}</div>
            </div>
            <div className="track-card-duration">{duration}</div>
            <div className="track-card-options">
                <Icon onClick={onClickOptions} size='small' name='3-dots' state='hover' />
            </div>
        </div>
    )
}