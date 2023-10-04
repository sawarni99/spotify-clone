import './Home.css'
import React, { useRef, useState } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import Carousel from '../../sections/carousel/Carousel'

const sampleData = [
  {src : '', key: '1', name: 'Daily Mix 1', desc : 'This is Daily mix'},
  {src : '', key: '2', name: 'Daily Mix 2', desc : 'This is Daily mix'},
  {src : '', key: '3', name: 'Daily Mix 3', desc : 'This is Daily mix'},
  {src : '', key: '4', name: 'Daily Mix 4', desc : 'This is Daily mix'},
  {src : '', key: '5', name: 'Daily Mix 5', desc : 'This is Daily mix'},
  {src : '', key: '6', name: 'Daily Mix 6', desc : 'This is Daily mix'},
  {src : '', key: '7', name: 'Daily Mix 7', desc : 'This is Daily mix'},
  {src : '', key: '8', name: 'Daily Mix 8', desc : 'This is Daily mix'},
  {src : '', key: '9', name: 'Daily Mix 9', desc : 'This is Daily mix'},
  {src : '', key: '10', name: 'Daily Mix 10', desc : 'This is Daily mix'},
]

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
        <Carousel data={sampleData} parentRef={mainRef} title='Made for you' />
      </div>
    </div>
  )
}
