import './Home.css'
import React, { useRef, useState } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'

export default function Home() {
  const [ navProp, setNavprop ] = useState({color: '#212121', isSolid: false})
  const mainRef = useRef(null);

  const onScroll = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    
    if( scrollTop >= 200 ) {
      setNavprop((props) => {
        return {...props, isSolid: true}
      });
    } else {
      setNavprop((props) => {
        return {...props, isSolid: false}
      });
    }
  }

  // const onChangeInput = (value) => {   // value will come here from the search input...
  //   // Do something with value got from search param...
  //   // console.log(value);
  // }

  return (
    <div ref={mainRef} onScroll={onScroll} className='home'>
      <NavBar color={navProp.color} isSolid={navProp.isSolid} />
      <div className="home-main">

      </div>
    </div>
  )
}
