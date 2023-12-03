import { getIcon } from '../../utils/IconUtil'
import './Icon.css'
import React from 'react'

export default function Icon({name, size, state, onClick}) {

  const style = {
    width : (size === 'small') ? '16px' : '24px',
    height : (size === 'small') ? '16px' : '24px',
  }

  return (
    <img onClick={onClick} src={getIcon(name, state)} alt={name} style={style}/>
  )
}
