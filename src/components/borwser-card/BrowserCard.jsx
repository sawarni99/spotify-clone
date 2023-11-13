import { getColorByName } from '../../utils/Helper';
import './BrowserCard.css';
import React from 'react'

export default function BrowserCard({name, onClick}) {

    if(name === undefined || name === null) name = 'Loading...';

    const style = {
        backgroundColor: getColorByName(name),
    }

    return (
        <div style={style} className='browser-card' onClick={onClick}>
            {name}
        </div>
    )
}
