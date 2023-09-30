import './NavBar.css'
import React, { useEffect, useRef } from 'react'
import { getRootStyle } from '../../utils/StyleUtil'

export default function NavBar({color, isSolid}) {

    const mainRef = useRef(null);

    const bgStyle = {
        backgroundImage: (getRootStyle('--color-bg') !== color) ? 
            `linear-gradient(180deg, ${color}, ${getRootStyle('--color-bg')})` :
            null,
    }

    const mainStyle = {
        background: isSolid ? color : null,
    }
    

    return (
        <>
            <div ref={mainRef} style={mainStyle} className='nav-bar'></div>
            <div style={bgStyle} className="nav-bar-background"></div>
        </>
    )
}
