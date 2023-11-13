import './Search.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import NavBar from '../../sections/nav-bar/NavBar'
import BrowserCard from '../../components/borwser-card/BrowserCard';
import { useAPI, useResize } from '../../hooks/hooks';
import TrackSearchResult from '../../sections/track-search-result/TrackSearchResult';
import Carousel from '../../sections/carousel/Carousel';
import { CATEGORIES, SUCCESS, get, getImageUrl } from '../../utils/ApiUtil';
import { logout } from '../../utils/AuthUtil';
import { ProfileContext } from '../../utils/Contexts';

export default function Search() {

	const mainRef = useRef(null);
	const widthState = useResize(mainRef, [1300, 1150, 1000, 770, 560]);
	const [showSearchLayout, setShowSearchLayout] = useState(false);
	const categories = useAPI(CATEGORIES);
	const [searchValue, setSearchValue] = useState("");
	const [ searchResult, setSearchResult ] = useState(null);
	// console.log(searchResult)
	const {country} = useContext(ProfileContext);
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
				const url = 'https://api.spotify.com/v1/search';
				const query = `q=${searchValue}&type=album%2Cplaylist%2Cartist%2Ctrack&market=${country}&limit=10`;

				get(url, query).then((response) => {
					if(response.error === undefined) {
						setSearchResult({
							tracks: response.tracks.items.map((item) => {
								return {
									artist : item.artists[0].name,
									album : item.album.name,
									id: item.id,
									image_url: getImageUrl(item.album.images),
									type: item.type,
									duration_ms: item.duration_ms,
									name: item.name,
								}
							}),
							albums: response.albums.items.map((item) => {
								return {
									artist: item.artists[0].name,
									name: item.name,
									id: item.id,
									image_url: getImageUrl(item.images),
									type: item.type,
								}
							}),
							artists: response.artists.items.map((item) => {
								return {
									name: item.name,
									image_url: getImageUrl(item.images),
									type: item.type,
									id: item.id,
								}
							}),
							playlists: response.playlists.items.map((item) => {
								return {
									name: item.name,
									image_url: getImageUrl(item.images),
									id: item.id,
									description: item.description,
								}
							})
						})
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


	// Setting the browser Cards when nothing is searched...
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
									desc: item.artist
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
								}
							}))}
						/>
					}
				</div>
			}

		</div>
	)
}
