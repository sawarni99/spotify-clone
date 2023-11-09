import './ProfileButton.css'
import React, { useState, useRef } from 'react'
import { profileMenuList } from '../../utils/Constants';
import { useCheckOutsideClick } from '../../hooks/hooks';
import { logout } from '../../utils/AuthUtil';

export default function ProfileButton({src}) {

    const [showMenu, setShowMenu] = useState(false);
    const mainRef = useRef(null);

    
    useCheckOutsideClick(mainRef, setShowMenu, false);

    const onClickProfile = () => {
        setShowMenu(value => !value);
    }

    const onClickMenuItem = (key) => {

        // Logic to do something when something is clicked...
        switch(key){
            case 'account':
                window.location.href = 'https://www.spotify.com/in-en/account/overview/';
                break;
            case 'logout':
                logout();
                break;
            default:
                return;
        }
    }

    return (
        <div ref={mainRef} className='profile-button-container'>
            <div onClick={onClickProfile} className='profile-button'>
                <img src={src} alt='' />
            </div>
            {
                showMenu &&
                <div className='profile-menu'>
                    {
                        profileMenuList.map((prop) => 
                            <div className='profile-menu-item' key={prop.key} onClick={() => onClickMenuItem(prop.key)}>
                                {prop.name}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}
