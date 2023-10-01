import './NavBar.css'
import React, { useEffect, useState } from 'react'
import { getRootStyle } from '../../utils/StyleUtil'
import ProfileButton from '../../components/profile-button/ProfileButton'
import SearchInput from '../../components/input/Input'

export default function NavBar({color, isSolid, onChange}) {

    const [ inputValue, setInputValue ] = useState('');

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
        </>
    )
}
