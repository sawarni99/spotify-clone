import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useResizeAll, useAuth } from './hooks/hooks';
import SideBarLink from './components/side-bar-link/SideBarLink'
import CircularButton from './components/circular-button/CircularButton';
import { pages, widthStates } from './utils/Constants';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import './App.css';
import Songs from './pages/songs/Songs';
import SideBarLibrary from './sections/side-bar-library/SideBarLibrary';
import Player from './sections/player/Player';
import Login from './pages/login/Login';
import { getAccessToken } from './utils/AuthUtil';

/*
	1. Have to create a Error (404, 400 etc.) page...
*/


function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const [ widthState, setWidthState ] = useResizeAll(appRef, sideBarRef, resizerRef);
	useAuth();
	const [selectedPage, setSelectedPage] = useState(null);
	const onClickHome = () => {
		setSelectedPage(pages.home)
	}

	const onClickSearch = () => {
		setSelectedPage(pages.search)
	}

	const onClickLibrary = () => {
		let value = widthStates.medium;
		
		if(widthState !== widthStates.small) {
			value = widthStates.small
		}

		setWidthState(value);
	}

	const onClickCollapse = () => {
		setWidthState(widthStates.medium);
	}

	const onClickExpand = () => {
		setWidthState(widthStates.large);
	}

	if(getAccessToken() === null) {
		return (
			<Login />
		)
	}
	
	return (
		<Router>
			<div className="App" ref={appRef}>
				<div className='app-body'>
					<div className='app-side-bar' ref={sideBarRef} >
						<div className='app-side-bar-container'>
							<div className='app-side-bar-menu'>
								<SideBarLink 
									icon='home' 
									onClick={onClickHome} 
									name='Home' 
									selected={window.location.pathname === pages.home || selectedPage === pages.home}
									widthState={widthState}
									to={pages.home}
								/>
								<SideBarLink 
									icon='search' 
									onClick={onClickSearch} 
									name='Search'
									selected={window.location.pathname.startsWith(pages.search) || selectedPage === pages.search} 
									widthState={widthState}
									to={pages.search}
								/>
							</div>
							<div className='app-side-bar-library'>
								<div className="app-side-bar-library-head">
									<SideBarLink 
										icon='library'
										name='Library'
										widthState={widthState}
										onClick={onClickLibrary}
									/>
									{ 
										( widthState === widthStates.large ) ?
											<CircularButton icon='arrow-left' onClick={onClickCollapse} /> : 
										(widthState === widthStates.medium) ?
											<CircularButton icon='arrow-right' onClick={onClickExpand} /> :
										null
									}
								</div>
								<div className="app-side-bar-library-body">
									<SideBarLibrary widthState={widthState} parentRef={sideBarRef} />
								</div>
							</div>
						</div>
						<div className='app-resizer' ref={resizerRef} />
					</div>
					<div className='app-main'>
						<Routes>
							<Route path={pages.home} element={<Home />}/>
							<Route path={pages.search} element={<Search />}/>
							<Route path={pages.album || pages.artist || pages.playlist} element={<Songs/>} />
						</Routes>
					</div>
				</div>
				<div className='app-player'>
					<Player />
				</div>
			</div>
		</Router>	
	);
}

export default App;
