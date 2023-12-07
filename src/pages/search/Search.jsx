import './Search.css'
import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import BrowserCard from '../../components/borwser-card/BrowserCard';
import { useAPI, useResize } from '../../hooks/hooks';
import TrackSearchResult from '../../sections/track-search-result/TrackSearchResult';
import Carousel from '../../sections/carousel/Carousel';
import { CATEGORIES, SEARCH, SUCCESS, get, parseResponse } from '../../utils/ApiUtil';
import { getCountry, logout } from '../../utils/AuthUtil';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { pages } from '../../utils/Constants';

export default function Search() {

	const mainRef = useRef(null);
	const widthState = useResize(mainRef, [1300, 1150, 1000, 770, 560]);
	const [showSearchLayout, setShowSearchLayout] = useState(false);
	const categories = useAPI(CATEGORIES);
	const [searchValue, setSearchValue] = useState("");
	const [ searchResult, setSearchResult ] = useState(null);
	const country = getCountry();
	const navigate = useNavigate();

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
		setSearchValue(() => {
			if(value === null || value === '') {
				setShowSearchLayout(() => {
					setSearchResult(null);
					return true;
				});
			} else {
				setShowSearchLayout(false);
			}
			return value;
		})
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			if(searchValue !== '') {
				const url = SEARCH;
				const query = `q=${searchValue}&type=album%2Cplaylist%2Cartist%2Ctrack&market=${country}&limit=10`;

				get(url, query).then((response) => {
					if(response.error === undefined) {
						setSearchResult(
							parseResponse(url, response));
					} else {
						if(response.error.status === 401) {
							logout();
						} else {
							console.log(response.error);
						}
					}
				}).catch((exception) => {
					console.log(exception);
				})
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [searchValue, country]);

	const onClickBrowseCard = (id) => {
		navigate({
			pathname: pages.category,
			search: createSearchParams({
				id: id,
			}).toString()
		})
	}

	// Setting the browser Cards when nothing is searched...
	let categoriesView = null;
	if(categories !== null && categories.status === SUCCESS) {
		categoriesView = categories.result.items.map(({id, name}) => <BrowserCard key={id} name={name} onClick={() => onClickBrowseCard(id)}/>)
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
					{
						searchResult !== null &&
						<TrackSearchResult 
							data={searchResult.tracks.map((item) => {
								return {
									key: item.id,
									name: item.name,
									artist: item.artist,
									src: item.image_url,
									duration: Math.round(item.duration_ms/1000),
									type: item.type,
									uri: item.context_uri,
								}
							})}
						/>
					}
					{
						searchResult !== null && searchResult.artists.length > 1 && 
						<Carousel 
							title="Artists" 
							parentRef={mainRef} 
							hideShowAll
							data={searchResult.artists.map((item) => {
								return {
									key: item.id,
									src: item.image_url,
									name: item.name,
									desc: "",
									type: item.type,
								}
							})}
						/>
					}
					{
						searchResult !== null && searchResult.albums.length > 1 &&
						<Carousel 
							title="Albums" 
							parentRef={mainRef} 
							hideShowAll 
							data={searchResult.albums.map((item) => {
								return {
									key: item.id,
									src: item.image_url,
									name: item.name,
									desc: item.artist,
									type: item.type,
								}
							})}
						/>
					}
					{
						searchResult !== null && searchResult.playlists.length > 1 &&
						<Carousel 
							title="Playlists" 
							parentRef={mainRef} 
							hideShowAll
							data={searchResult.playlists.map((item => {
								return {
									key: item.id,
									src: item.image_url,
									name: item.name,
									desc: item.description,
									type: item.type,
								}
							}))}
						/>
					}
				</div>
			}

		</div>
	)
}
