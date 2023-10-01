import './ProfileButton.css'
import React, { useState, useRef } from 'react'
import { profileMenuList } from '../../utils/Constants';
import { useCheckOutsideClick } from '../../hooks/hooks';

export default function ProfileButton({src}) {

    const [showMenu, setShowMenu] = useState(false);
    const mainRef = useRef(null);

    
    useCheckOutsideClick(mainRef, setShowMenu);

    const onClickProfile = () => {
        setShowMenu(value => !value);
    }

    const onClickMenuItem = (key) => {

        // Logic to do something when something is clicked...
        switch(key){
            case 'account':
                // Fill here...
                break;
            case 'logout':
                // Fill here...
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
