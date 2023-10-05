import './Home.css'
import React, { useRef } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import Carousel from '../../sections/carousel/Carousel'

export default function Home() {

	const mainRef = useRef(null);

	return (
		<div ref={mainRef} className='home'>
		<NavBar page='home' parentRef={mainRef} />
		<div className="home-main">
			<Carousel parentRef={mainRef} />
		</div>
		</div>
	)
}
