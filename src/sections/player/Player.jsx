import Icon from '../../components/icon/Icon';
import PlayButton from '../../components/play-button/PlayButton';
import ProgressBar from '../../components/progress-bar/ProgressBar';
import './Player.css';
import React, { useEffect, useRef, useState } from 'react';
import { useHover } from '../../hooks/hooks';

export default function Player() {

    const [progress, setProgress] = useState(0);
    const [isProgressBarClicked, setIsProgressBarClicked] = useState(false);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
    const prevHover = useHover(prevRef);
    const nextHover = useHover(nextRef);

    const onClickPrevious = () => {
        // Logic to play previous song...
    }

    const onClickNext = () => {
        // Logic to play next song...
    }

    const onProgressBarClicked = (clicked) => {
        
    }

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         if(!isProgressBarClicked){
    //             setProgress((progress) => progress + 1);
    //         }
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, [progress, isProgressBarClicked]);


    return (
        <div className='player'>
            <div className="player-left">
                <div className="player-song-img-container">
                    <img src="" alt="" className="player-song-img" />
                </div>
                <div className="player-song-desc">
                    <div className="player-song-name">Loading...</div>
                    <div className="player-song-artist">Loading...</div>
                </div>
            </div>
            <div className="player-center">
                <div className="player-controls">
                    <div ref={prevRef} className="player-previous">
                        <Icon onClick={onClickPrevious} name='previous' state={prevHover[0]} size='small' />
                    </div>
                    <div className="player-play">
                        <PlayButton size='small' plain />
                    </div>
                    <div ref={nextRef} className="player-next">
                        <Icon onClick={onClickNext} name='next' state={nextHover[0]} size='small' />
                    </div>
                </div>
                <div className="player-progress">
                    <ProgressBar progress={progress} setProgress={setProgress} onClicked={onProgressBarClicked} />
                </div>
            </div>
            <div className="player-right">
                <div className="player-vol-img">
                    <Icon name='sound-on' state='hover' size='small' />
                </div>
                <div className="player-vol"></div>
            </div>
        </div>
    )
}
