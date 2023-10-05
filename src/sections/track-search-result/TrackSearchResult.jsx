import PlayButton from '../../components/play-button/PlayButton'
import TrackCard from '../../components/track-card/TrackCard'
import './TrackSearchResult.css'
import React from 'react'

export default function TrackSearchResult() {

    const onClickPlay = () => {
        // Logic to play the Song/Album...
    }

    return (
        <div className='track-result'>
            <div className="track-result-left">
                <div className="track-result-left-head">
                    Top result
                </div>
                <div className="track-result-left-body">
                    <div className="track-result-img-left-container">
                        <img className='track-result-left-img' src='' alt='' />
                    </div>
                    <div className="track-result-left-desc">
                        Loading...
                    </div>
                    <div className="track-result-left-play">
                        <PlayButton onclick={onClickPlay} />
                    </div>
                </div>
            </div>
            <div className="track-result-right">
                <div className="track-result-right-head">
                    Songs
                </div>
                <div className="track-result-right-body">
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                </div>
            </div>
        </div>
    )
}
