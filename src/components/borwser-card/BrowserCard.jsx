import './BrowserCard.css';
import React from 'react'

export default function BrowserCard({name, onClick}) {

    if(name === undefined || name === null) name = 'Loading...';

    return (
        <div className='browser-card' onClick={onClick}>
            {name}
        </div>
    )
}
