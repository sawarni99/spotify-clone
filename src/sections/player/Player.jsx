import Icon from '../../components/icon/Icon';
import PlayButton from '../../components/play-button/PlayButton';
import ProgressBar from '../../components/progress-bar/ProgressBar';
import './Player.css';
import React, { useEffect, useRef, useState } from 'react';
import { useHover, usePlayer } from '../../hooks/hooks';
import { getFormattedTime } from '../../utils/Helper';

export default function Player() {
    
    const [progress, setProgress] = useState(0);
    const [sound, setSound] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const {player, track, is_playing, progress_percent} = usePlayer();
    const duration = track?track.duration_ms/1000:0;
    let isProgressBarClicked = false;

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
    const prevHover = useHover(prevRef);
    const nextHover = useHover(nextRef);

    useEffect(() => {
        setIsPlaying(is_playing);
        setProgress(progress_percent);
    }, [track, is_playing, progress_percent]);

    const onClickPlay = () => {
        player.togglePlay();
    }

    const onClickPrevious = () => {
        // Logic to play previous song...
    }

    const onClickNext = () => {
        // Logic to play next song...
    }

    const onProgressBarClicked = (clicked) => {
        // Logic to pause the progression when progress bar is clicked...
        isProgressBarClicked = clicked;
    }

    const onclickSoundButton = () => {
        setSound(sound => {
            if(sound === 0) {
                return 50;
            }else {
                return 0;
            }
        })
    }

    useEffect(() => {
        let interval = null;

        if(isPlaying && progress < 100) {
            interval = setInterval(() => {
                if(!isProgressBarClicked){
                    setProgress(progress => progress + (100/duration));
                }
            }, 1000);
        }else {
            if(interval !== null) {
                clearInterval(interval);
            }
        }

        return () => {
            clearInterval(interval);
        }

    }, [progress, isProgressBarClicked, isPlaying, duration ]);

    useEffect(() => {
        if(progress >= 100) {
            setIsPlaying(false);
        }
    }, [progress]);

    useEffect(() => {
        // Change sound here...
    }, [sound]);

    return (
        <div className='player'>
            <div className="player-left">
                <div className="player-song-img-container">
                    <img src={track ? track.image_url:''} alt="" className="player-song-img" />
                </div>
                <div className="player-song-desc">
                    <div className="player-song-name">{track ? track.name:''}</div>
                    <div className="player-song-artist">{track ? track.artist:''}</div> 
                </div>
            </div>
            <div className="player-center">
                <div className="player-controls">
                    <div ref={prevRef} className="player-previous">
                        {
                            track ?
                            <Icon onClick={onClickPrevious} name='previous' state={prevHover[0]} size='small' /> : 
                            <Icon name='previous' state={'unselected'} size='small' />
                        }
                    </div>
                    <div className="player-play">
                        {
                            track ?
                            <PlayButton onClick={onClickPlay} size='small' plain isPlaying={isPlaying} /> :
                            <PlayButton size='small' plain isPlaying={isPlaying} disabled />
                        }
                    </div>
                    <div ref={nextRef} className="player-next">
                        {
                            track ? 
                            <Icon onClick={onClickNext} name='next' state={nextHover[0]} size='small' /> :
                            <Icon name='next' state={'unselected'} size='small' />
                        }
                    </div>
                </div>
                <div className="player-progress">
                    <div className="player-time">{getFormattedTime(Math.round(progress*duration/100))}</div>
                    <ProgressBar progress={progress} duration={duration} setProgress={setProgress} onClicked={onProgressBarClicked} />
                    <div className="player-time">{getFormattedTime(duration)}</div>
                </div>
            </div>
            <div className="player-right">
                <div onClick={onclickSoundButton} className="player-vol-img">
                    {
                        (sound > 0) ? 
                        <Icon name='sound-on' state='hover' size='small' /> : 
                        <Icon name='sound-off' state='hover' size='small' />
                    }
                    
                </div>
                <div className="player-vol">
                    <ProgressBar progress={sound} duration={100} setProgress={setSound} />
                </div>
            </div>
        </div>
    )
}
