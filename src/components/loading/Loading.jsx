import React, { useEffect, useRef } from 'react'
import './Loading.css'

export default function Loading() {

    const mainRef = useRef(null);

    useEffect(() => {
        let degree = 0;
        const interval = setInterval(() => {
            mainRef.current.style.transform = `rotate(${degree}deg)`;
            degree = (degree + 1)%360;
        }, 5);

        return () => {
            clearInterval(interval);
        }
    })

    return (
        <div ref={mainRef} className='loading'/>
    )
}
