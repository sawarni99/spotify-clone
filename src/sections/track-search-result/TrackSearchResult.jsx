import PlayButton from '../../components/play-button/PlayButton'
import TrackCard from '../../components/track-card/TrackCard'
import './TrackSearchResult.css'
import React from 'react'

const sampleData = [];
for(let i=0; i<5; i++) {
  sampleData.push({key: i, src:'', name: 'Loading...', desc: 'Loading...', duration: 0, uri: null})
}

export default function TrackSearchResult({data}) {

    if(data === undefined || data === null) {
        data = sampleData;
    } else {
        if(data.length > 5) {
            data = data.slice(0, 4);
        }
    }

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
                        <img className='track-result-left-img' src={data[0].src} alt='' />
                    </div>
                    <div className="track-result-left-desc">
                        {data[0].name}
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
                    {
                        data.map(({src, name, artist, duration, key, uri}) =>
                            <TrackCard key={key} src={src} name={name} artist={artist} duration={duration} uri={uri} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
