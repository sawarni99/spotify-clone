import './NavBar.css'
import React, { useEffect, useState } from 'react'
import { getRootStyle } from '../../utils/StyleUtil'
import ProfileButton from '../../components/profile-button/ProfileButton'
import SearchInput from '../../components/input/Input'
import { getGreetings } from '../../utils/Helper'
import LongCard from '../../components/long-card/LongCard'
import { widthStates } from '../../utils/Constants'

export default function NavBar({color, isSolid, onChange, page, parentRef}) {

    const [ inputValue, setInputValue ] = useState('');
    const [ widthState, setWidthState ] = useState(null);

    const onChangeInput = (event) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    // To pass the value to the parent...
    useEffect(() => {
        if(onChange !== undefined && onChange === 'function') {
            onChange(inputValue);
        }
    }, [inputValue, onChange]);

    const mainStyle = {
        background: isSolid ? color : null,
    }
    
    // Checking the page type... { 'home', 'search', 'album' }
    let bgStyle = null;
    let child = null;
    let childStyle = {};
    switch(page) {
        case 'home':
            bgStyle = {
                backgroundImage: (getRootStyle('--color-bg') !== color) ? 
                    `linear-gradient(180deg, ${color}, ${getRootStyle('--color-bg')})` :
                    null,
            }

            if(widthState === widthStates.large) {
                childStyle = {
                    gridTemplateRows: '1fr 1fr',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }
            } else if(widthState === widthStates.medium) {
                childStyle = {
                    gridTemplateRows: '1fr 1fr 1fr',
                    gridTemplateColumns: '1fr 1fr',
                }
            } else {
                childStyle = {
                    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
                    gridTemplateColumns: '1fr',
                }
            }

            child = (
                <div className="nav-bar-home">
                    <div className="nav-bar-home-head">
                        {getGreetings()}
                    </div>
                    <div style={childStyle} className="nav-bar-home-body">
                        <LongCard />
                        <LongCard />
                        <LongCard />
                        <LongCard />
                        <LongCard />
                        <LongCard />
                    </div>
                </div>
            );
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

    // Resize checks...
    useEffect(() => {

        const observer = new ResizeObserver((entries => {
            const width = entries[0].contentRect.width;

            if(width < 570) {
                setWidthState(widthStates.small);
            } else if (width < 970) {
                setWidthState(widthStates.medium);
            } else {
                setWidthState(widthStates.large);
            }

        }));
        observer.observe(parentRef.current);

    }, [parentRef]);
    
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
