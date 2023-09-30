import { useRef, useState } from 'react';
import { useResize } from './hooks/hooks';
import SideBarLink from './components/side-bar-link/SideBarLink'
import { pages } from './utils/Constants';
import './App.css';

function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const widthState = useResize(appRef, sideBarRef, resizerRef);
	const [ selectedPage, setSelectedPage ] = useState(pages.home);

	const onClickHome = () => {
		setSelectedPage(pages.home);
	}

	const onClickSearch = () => {
		setSelectedPage(pages.search);
	}

	return (
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
							/>

							<SideBarLink 
								icon='search' 
								onClick={onClickSearch} 
								name='Search' 
								selected={pages.search === selectedPage} 
								widthState={widthState}
							/>
						</div>
						<div className='app-side-bar-library'></div>
					</div>
					<div className='app-resizer' ref={resizerRef} />
				</div>
				<div className='app-main'></div>
			</div>
			<div className='app-player'></div>
		</div>
	);
}

export default App;
