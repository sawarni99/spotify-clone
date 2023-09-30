import './SideBarLink.css'
import React, { useEffect, useState } from 'react'
import { getRootStyle } from '../../utils/StyleUtil';
import Icon from '../icon/Icon'
import { widthStates } from '../../utils/Constants';
import { Link } from 'react-router-dom';

const styleUnselected = {
  color: getRootStyle('--color-gray'),
}

const styleSelected = {
  color: getRootStyle('--color-white'),
}

export default function SideBarLink({icon, name, onClick, selected, widthState, to}) {
  

  const [ state, setState ] = useState('unselected');
  const [ style, setStyle ] = useState(styleUnselected)

  useEffect(() => {
    if(selected) {
      setStyle(() => {
        setState('selected');
        return styleSelected;
      })
    }else {
      setStyle(() => {
        setState('unselected');
        return styleUnselected;
      })
    }
  }, [selected]);

  const onMouseOver = () => {
    if(!selected) {
      setStyle(() => {
        setState('hover');
        return styleSelected;
      })
    }
  }

  const onMouseOut = () => {
    if(!selected) {
      setStyle(() => {
        setState('unselected');
        return styleUnselected;
      })
    }
  }


  return (
    <Link to={to} className='react-link'>
      <div 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut} 
        className='side-bar-link' style={style} onClick={onClick} >
          <div className='side-bar-link-icon'>
            <Icon name={icon} state={state} />
          </div>
          { widthState !== widthStates.small && <span>{name}</span> }
      </div>
    </Link>
  )
}
