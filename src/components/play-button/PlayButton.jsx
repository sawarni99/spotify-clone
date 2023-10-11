import './PlayButton.css';
import React from 'react'

export default function PlayButton({plain, size, onClick}) {

  let className = 'play-button normal';
  let style = {
    height: (size === 'small') ? '35px' : '50px',
    width: (size === 'small') ? '35px' : '50px',
  }

  if(plain) {
    className = 'play-button plain'
  }

  return (
    <div className={className} style={style} onClick={onClick} >
        <img 
          src='./assets/icons/play-black-selected.png' 
          className='play-button-icon'   
          alt='Play' 
        />
    </div>
  )
}
