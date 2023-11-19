import NavBar from '../../sections/nav-bar/NavBar'
import TrackCard from '../../components/track-card/TrackCard'
import Icon from '../../components/icon/Icon'
import './Songs.css'
import React, { useRef } from 'react'
import PlayButton from '../../components/play-button/PlayButton';
import { pages } from '../../utils/Constants'
import { PLAYLIST_TRACKS } from '../../utils/ApiUtil'
import useAPI from '../../hooks/useAPI'
import { getLocalStorage } from '../../utils/Helper'
import { COUNTRY_KEY } from '../../utils/AuthUtil'
import { useSearchParams } from 'react-router-dom'

export default function Songs({pageType}) {

    let apiUrl = null;
    switch(pageType) {
        case pages.playlist:
            apiUrl = PLAYLIST_TRACKS;
            break;
        default:
            apiUrl = "";
    }
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id');
    const mainRef = useRef(null);
    const tracks_res = useAPI(apiUrl, `market=${getLocalStorage(COUNTRY_KEY)}`, id);

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
