import NavBar from '../../sections/nav-bar/NavBar'
import TrackCard from '../../components/track-card/TrackCard'
import Icon from '../../components/icon/Icon'
import './Songs.css'
import React, { useRef } from 'react'
import PlayButton from '../../components/play-button/PlayButton';

export default function Songs() {

    const mainRef = useRef(null);

    const onClickPlay = () => {
        // Logic to play album... 
    }

    const onClickOptions = () => {
        // Logic to open options...
    }

    return (
        <div ref={mainRef} className='songs-page'>
            <NavBar parentRef={mainRef} page='songs' />
            <div className="songs-page-menu">
                <div className="songs-page-controls">
                    <PlayButton onClick={onClickPlay} />
                    <div className="songs-page-options">
                        <Icon onClick={onClickOptions} name='3-dots' state='hover'/>
                    </div>
                </div>
                <TrackCard />
                <TrackCard />
                <TrackCard />
                <TrackCard />
            </div>
        </div>
    )
}
