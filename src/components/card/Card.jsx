import './Card.css';
import React from 'react'

export default function Card({src, name, desc, onClick}) {

    if(src === undefined || src === null) src = ''
    if(name === undefined || name === null) name = 'Loading...'
    if(desc === undefined || desc === null) desc = 'Loading...'

    return (
        <div className='card'>
            <div className="card-img-container">
                <img src="" alt="" className="card-img" />
            </div>
            <div className="card-name">
                {name}
            </div>
            <div className="card-desc">
                {desc}
            </div>
        </div>
    )
}
