import './NavBar.css'
import React from 'react'
import { getRootStyle } from '../../utils/StyleUtil'
import ProfileButton from '../../components/profile-button/ProfileButton'

export default function NavBar({color, isSolid}) {

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
            <div style={mainStyle} className='nav-bar'>
                <div className="nav-bar-left">
                </div>
                <div className="nav-bar-right">
                    <ProfileButton src='./assets/icons/sample-dp.webp' />
                </div>
            </div>
            <div style={bgStyle} className="nav-bar-background" />
        </>
    )
}
