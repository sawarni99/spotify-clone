import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useResize } from './hooks/hooks';
import SideBarLink from './components/side-bar-link/SideBarLink'
import CircularButton from './components/circular-button/CircularButton';
import { pages, widthStates } from './utils/Constants';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import './App.css';

/*
	1. Have to create a 404 page...
*/

function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const [ widthState, setWidthState ] = useResize(appRef, sideBarRef, resizerRef);
	const [ selectedPage, setSelectedPage ] = useState(pages.home);

	const onClickHome = () => {
		setSelectedPage(pages.home);
	}

	const onClickSearch = () => {
		setSelectedPage(pages.search);
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
									selected={pages.home === selectedPage}
									widthState={widthState}
									to={pages.home}
								/>
								<SideBarLink 
									icon='search' 
									onClick={onClickSearch} 
									name='Search'
									selected={pages.search === selectedPage} 
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
							</div>
						</div>
						<div className='app-resizer' ref={resizerRef} />
					</div>
					<div className='app-main'>
						<Routes>
							<Route path={pages.home} element={<Home />}/>
							<Route path={pages.search} element={<Search />}/>
						</Routes>
					</div>
				</div>
				<div className='app-player'></div>
			</div>
		</Router>	
	);
}

export default App;
