import './NavBar.css'
import React, { useContext, useEffect, useState } from 'react'
import ProfileButton from '../../components/profile-button/ProfileButton'
import SearchInput from '../../components/input/Input'
import NavBarHome from '../nav-bar-home/NavBarHome'
import NavBarSongs from '../nav-bar-songs/NavBarSongs'
import { getRootStyle } from '../../utils/StyleUtil'
import {useResize, useScroll} from '../../hooks/hooks';
import { ProfileContext } from '../../utils/Contexts'
import { SUCCESS } from '../../utils/ApiUtil'

export default function NavBar({ onChange, page, parentRef, albumInfo }) {
    
    const color = '#212121';
    const [ inputValue, setInputValue ] = useState('');
    const widthState = useResize(parentRef, [970, 570]);
    const isSolid = useScroll(parentRef, 200);
    const profile = useContext(ProfileContext);
    let src = './assets/icons/sample-dp.webp';
    if(profile !== null && profile.status === SUCCESS) {
        src = profile.result.image_url;
    }

    if(albumInfo === undefined || albumInfo === null) albumInfo = null;

    const mainStyle = {
        background: isSolid ? color : null,
    }

    const onChangeInput = (event) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    // To pass the value to the parent...
    useEffect(() => {
        if(onChange !== undefined && typeof onChange === 'function') {
            onChange(inputValue);
        }
    }, [inputValue, onChange]);
    
    // Checking the page type... { 'home', 'search', 'album' }
    let bgStyle = null;
    let child = null;
    switch(page) {
        case 'home':
            bgStyle = {
                backgroundImage: (getRootStyle('--color-bg') !== color) ? 
                    `linear-gradient(180deg, ${color}, ${getRootStyle('--color-bg')})` :
                    null,
                height: 'calc(var(--nav-bar-bg-height) - var(--nav-bar-height)',
            }
            child = <NavBarHome sizeState={widthState} />
            break;

        case 'search':
            bgStyle = {
                display: 'none',
            }
            break;

        case 'songs':
            bgStyle = {
                backgroundImage: (getRootStyle('--color-bg') !== color) ? 
                    `linear-gradient(180deg, ${color}, ${getRootStyle('--color-bg')})` :
                    null,
                height: 'calc(100vh - 3 * var(--nav-bar-height))',
            }
            child = <NavBarSongs parentRef={parentRef} sizeState={widthState} info={albumInfo} />
            break;

        default:
            bgStyle = null;
            child = null;
    }

    return (
        <>
            <div style={mainStyle} className='nav-bar'>
                <div className="nav-bar-left">
                    {
                        (onChange !== undefined) &&
                        <SearchInput 
                            placeholder='What do you want to listen to?' 
                            onChange={onChangeInput} 
                            value={inputValue} 
                            setValue={setInputValue}
                            icon='search'
                        />
                    }
                </div>
                <div className="nav-bar-right">
                    <ProfileButton src={src} />
                </div>
            </div>
            <div style={bgStyle} className="nav-bar-background" />
            {child}
        </>
    )
}
