import './Login.css'
import React from 'react'

export default function Login() {
  return (
    <div className='login-page'>
        <img className='login-page-img' src='./assets/icons/spotify.png' alt='Spotify' />
        <span className='login-page-desc'>This is a clone of Spotify made for educational purposes</span>
        <button className='login-button'>Login</button>
    </div>
  )
}
