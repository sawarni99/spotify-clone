import './Home.css'
import React, { useRef } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import Carousel from '../../sections/carousel/Carousel'
import { CATEGORY_PLAYLISTS, SUCCESS } from '../../utils/ApiUtil';
import useAPI from '../../hooks/useAPI';
import { getLocalStorage } from '../../utils/Helper';
import { COUNTRY_KEY } from '../../utils/AuthUtil';

export default function Home() {

	const mainRef = useRef(null);
	const id = 'toplists'
	const playlists_res = useAPI(CATEGORY_PLAYLISTS, `country=${getLocalStorage(COUNTRY_KEY)}`, id);

	return (
		<div ref={mainRef} className='home'>
		<NavBar page='home' parentRef={mainRef} />
		<div className="home-main">
			{
				playlists_res !== null && playlists_res.status === SUCCESS &&
				<Carousel 
					id={id}
					title='Top Lists' 
					parentRef={mainRef}
					data={
						playlists_res.result.items.map(({id, image_url, description, name}) => {
							return {
								key: id,
								src: image_url,
								desc: description,
								name: name,
							}
						})
					}
				/>
			}
		</div>
		</div>
	)
}
