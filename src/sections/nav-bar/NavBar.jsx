import './NavBar.css'
import React, { useEffect, useState } from 'react'
import ProfileButton from '../../components/profile-button/ProfileButton'
import SearchInput from '../../components/input/Input'
import NavBarHome from '../nav-bar-home/NavBarHome'
import { getRootStyle } from '../../utils/StyleUtil'
import {useResize, useScroll} from '../../hooks/hooks';

export default function NavBar({ onChange, page, parentRef }) {
    
    const color = '#212121';
    const [ inputValue, setInputValue ] = useState('');
    const widthState = useResize(parentRef, [970, 570]);
    const isSolid = useScroll(parentRef, 200);
    console.log(isSolid)

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
            }
            child = <NavBarHome parentRef={parentRef} sizeState={widthState} />
            break;

        case 'search':
            bgStyle = {
                display: 'none',
            }
            break;

        case 'album':
            // Do something...
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
                    <ProfileButton src='./assets/icons/sample-dp.webp' />
                </div>
            </div>
            <div style={bgStyle} className="nav-bar-background" />
            {child}
        </>
    )
}
