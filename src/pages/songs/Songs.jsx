import NavBar from '../../sections/nav-bar/NavBar'
import TrackCard from '../../components/track-card/TrackCard'
import './Songs.css'
import React, { useRef } from 'react'
import PlayButton from '../../components/play-button/PlayButton';
import { pages } from '../../utils/Constants'
import { ALBUM_TRACKS, ARTIST, ARTIST_TOP_TRACKS, FAILURE, PLAY, PLAYLIST_TRACKS, SUCCESS, getBodyForSongPlay, put } from '../../utils/ApiUtil'
import useAPI from '../../hooks/useAPI'
import { getColorByName } from '../../utils/Helper'
import { getCountry } from '../../utils/AuthUtil'
import { useSearchParams } from 'react-router-dom'

export default function Songs({pageType}) {

    /*
    playlist: 37i9dQZF1DWZNJXX2UeBij,
    album: 5xjaz957o6YGSXmlfd2tex,
    artist: 2oSONSC9zQ4UonDKnLqksx
    */

    let apiUrl = null;
    let infoApiUrl = null;
    switch(pageType) {
        case pages.playlist:
            apiUrl = PLAYLIST_TRACKS;
            break;
        case pages.album:
            apiUrl = ALBUM_TRACKS;
            break;
        case pages.artist:
            apiUrl = ARTIST_TOP_TRACKS;
            infoApiUrl = ARTIST;
            break;
        default:
            apiUrl = "";
    }
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id');
    const mainRef = useRef(null);
    const tracks_res = useAPI(apiUrl, `market=${getCountry()}`, id);
    const artist_res = useAPI(infoApiUrl, null, id);
    let info = null;

    if(tracks_res !== null && tracks_res.status === SUCCESS) {
        switch(pageType){
            case pages.playlist:
            case pages.album:
                info = {
                    src: tracks_res.result.info.image_url,
                    desc: tracks_res.result.info.description,
                    name: tracks_res.result.info.name,
                    pageType: pageType,
                    context_uri: tracks_res.result.info.context_uri,
                }
                break;
            case pages.artist:
                if(artist_res !== null && artist_res.status === SUCCESS) {
                    info = {
                        src: artist_res.result.image_url,
                        desc: "",
                        name: artist_res.result.name,
                        pageType: pageType,
                        context_uri: artist_res.result.context_uri,
                    }
                }
                break;
            default:
                info = null;
        }
    }

    const onClickPlay = () => {
        
        if(!tracks_res || tracks_res.status === FAILURE) return;

        put(PLAY, getBodyForSongPlay(info.context_uri));
    }

    return (
        <div ref={mainRef} className='songs-page'>
            <NavBar 
                parentRef={mainRef} 
                page='songs' 
                info={info} 
                color={(info !== null) ? getColorByName(info.name):'#212121'} 
            />
            <div className="songs-page-menu">
                <div className="songs-page-controls">
                    <PlayButton onClick={onClickPlay} />
                </div>
                {
                    tracks_res !== null && tracks_res.status === SUCCESS &&
                    tracks_res.result.items.map(({id, name, artist, duration_ms, image_url, context_uri}) => 
                        <TrackCard 
                            key={id} 
                            name={name} 
                            artist={artist} 
                            duration={Math.round(duration_ms/1000)}
                            src={(image_url !== undefined) ? image_url : ""}
                            uri={context_uri}
                        />
                    )
                }
            </div>
        </div>
    )
}
