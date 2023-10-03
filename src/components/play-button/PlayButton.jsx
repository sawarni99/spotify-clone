import './PlayButton.css';
import React from 'react'

export default function PlayButton({plain, size}) {

  let className = 'play-button normal';
  let style = {
    height: (size === 'small') ? '32px' : '50px',
    width: (size === 'small') ? '32px' : '50px',
  }

  if(plain) {
    className = 'play-button plain'
  }

  return (
    <div className={className} style={style} >
        <img 
          src='./assets/icons/play-black-selected.png' 
          className='play-button-icon'   
          alt='Play' 
        />
    </div>
  )
}
