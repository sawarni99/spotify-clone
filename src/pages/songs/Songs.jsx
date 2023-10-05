import NavBar from '../../sections/nav-bar/NavBar'
import './Songs.css'
import React, { useRef } from 'react'

export default function Songs() {

    const mainRef = useRef(null);

    return (
        <div ref={mainRef} className='songs-page'>
            <NavBar parentRef={mainRef} page='songs' />
        </div>
    )
}
