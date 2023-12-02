import './PlayButton.css';
import React from 'react'

export default function PlayButton({plain, size, onClick, isPlaying, disabled}) {

  let className = 'play-button normal';
  let src = './assets/icons/play-black-selected.png';
  let style = {
    height: (size === 'small') ? '35px' : '50px',
    width: (size === 'small') ? '35px' : '50px',
    opacity: disabled ? 0.7:1,
  }

  if(isPlaying) {
    src = './assets/icons/pause-black-selected.png';
  }

  if(plain) {
    className = 'play-button plain'
  }

  return (
    <div className={className} style={style} onClick={onClick} >
        <img 
          src={src}
          className='play-button-icon'   
          alt='Play' 
        />
    </div>
  )
}
