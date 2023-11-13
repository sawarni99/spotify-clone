import './Search.css'
import React, { useRef, useState } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import BrowserCard from '../../components/borwser-card/BrowserCard';
import { useAPI, useResize } from '../../hooks/hooks';
import TrackSearchResult from '../../sections/track-search-result/TrackSearchResult';
import Carousel from '../../sections/carousel/Carousel';
import { CATEGORIES, SUCCESS } from '../../utils/ApiUtil';

export default function Search() {

	const mainRef = useRef(null);
	const widthState = useResize(mainRef, [1300, 1150, 1000, 770, 560]);
	const [showSearchLayout, setShowSearchLayout] = useState(false);
	const categories = useAPI(CATEGORIES);
	let style = {};


	switch(widthState) {
		case 0 :
			style = {
				gridTemplateColumns: '1fr 1fr',
			}
			break;
		case 1:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr',
			}
			break;
		case 2:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr',
			}
			break;
		case 3:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
			}
			break;
		case 4:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
			}
			break;
		default:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
			}
	}

	const onChangeInputvalue = (value) => {
		if(value === null || value === '') {
			setShowSearchLayout(true);
		} else {
			setShowSearchLayout(false);
		}
	}

	let categoriesView = null;
	if(categories !== null && categories.status === SUCCESS) {
		categoriesView = categories.result.items.map(({id, name}) => <BrowserCard key={id} name={name}/>)
	} 

	return (
		<div className='search' ref={mainRef}>
			<NavBar onChange={onChangeInputvalue} page='search' parentRef={mainRef} />
			{
				showSearchLayout ?
				<div className="search-browser">
					<div className="search-browser-header">
						Browse all
					</div>
					<div style={style} className="search-browser-body">
						{
							categoriesView
						}
					</div>
				</div> : 

				<div className="search-browser">
					<TrackSearchResult />
					<Carousel title="Artists" parentRef={mainRef} hideShowAll/>
					<Carousel title="Albums" parentRef={mainRef} hideShowAll />
					<Carousel title="Playlists" parentRef={mainRef} hideShowAll />
				</div>
			}

		</div>
	)
}
