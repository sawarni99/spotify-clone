import { useRef } from 'react';
import { useResize } from './hooks/hooks';
import './App.css';

function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const sizeValue = useResize(appRef, sideBarRef, resizerRef);
	// console.log(sizeValue);

	return (
		<div className="App" ref={appRef}>
			<div className='app-body'>
				<div className='app-side-bar' ref={sideBarRef} >
					<div className='app-side-bar-main'>
						<div className='app-side-bar-menu'></div>
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
