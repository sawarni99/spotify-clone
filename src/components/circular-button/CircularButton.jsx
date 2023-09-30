import useHover from '../../hooks/useHover';
import Icon from '../icon/Icon'
import './CircularButton.css'
import React, { useRef } from 'react'

export default function CircularButton({icon, onClick}) {

    const mainRef = useRef(null);
    const iconEvent = useHover(mainRef);

    return (
        <div className='circular-button'>
            <div className="circular-button-icon" ref={mainRef} onClick={onClick}>
                <Icon name={icon} size='small' state={iconEvent} />
            </div>
        </div>
    )
}
