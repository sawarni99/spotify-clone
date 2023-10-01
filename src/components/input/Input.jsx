import { useHover, useCheckOutsideClick } from '../../hooks/hooks';
import Icon from '../icon/Icon';
import './Input.css'
import React, {useEffect, useRef, useState} from 'react'

export default function Input({placeholder, value, onChange, icon, setValue}) {

    const mainRef = useRef(null);
    const inputRef = useRef(null);
    const [ iconState, setIconState ] = useHover(mainRef);
    const [showCloseIcon, setShowCloseIcon] = useState(false);
    useCheckOutsideClick(mainRef, setIconState, 'unselected');

    useEffect(() => {
        if(value !== '') {
            setShowCloseIcon(true);
        } else {
            setShowCloseIcon(false);
        }
    }, [value]);

    const onClickClose = () => {
        inputRef.current.focus();
        setValue('');
    }

    const onFocus = () => {
        setIconState('selected');
    }

    return (
        <div className='input-container' ref={mainRef} onClick={onFocus}>
            <Icon name={icon} size='small' state={iconState} />
            <input ref={inputRef} className='input' placeholder={placeholder} value={value} onChange={onChange} />
            {
                showCloseIcon &&
                <div onClick={onClickClose} className="input-close-icon">
                    <Icon name='cross' size='small' state={iconState} />
                </div>
            }
        </div>
    )
}
