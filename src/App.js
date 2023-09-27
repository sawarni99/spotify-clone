import { useRef, useEffect, useState } from 'react';
import { getStyleValue, numToPx } from './helper/StyleHelper';
import './App.css';

/*
    State 0 = min-width = 72px, max-width = 72px
    State 1 = min-width = 280px (18.5%) , max-width = 420px (27.5%)
    State 2 = min-width = 584px (38.5%), max-width = 1096px (72.5%)
*/

const sizeInterval = [{min: 72, max: 72}, {min: 280, max: 420}, {min: 584, max: 1096}]
const INITIAL_INDEX = 0;
const MIN_WIDTH_MAIN = 400;

function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const [sideBarIndex, setSideBarIndex] = useState(INITIAL_INDEX);

	// Initializing initial width...
	useEffect(() => {
		sideBarRef.current.style.width = numToPx(sizeInterval[INITIAL_INDEX].min);
	}, [])

	// Logic while resizing window...
	useEffect(() => {
		const sideBar = sideBarRef.current;
		const observer = new ResizeObserver((entries) => {
			const appWidth = entries[0].contentRect.width;
			if(appWidth < sizeInterval[2].max + MIN_WIDTH_MAIN) {
				sideBar.style.minWidth = numToPx(sizeInterval[1].min);
				sideBar.style.maxWidth = numToPx(sizeInterval[1].max);
				setSideBarIndex(1);
			}

			if(appWidth < sizeInterval[1].max + MIN_WIDTH_MAIN) {
				sideBar.style.minWidth = numToPx(sizeInterval[0].min);
				sideBar.style.maxWidth = numToPx(sizeInterval[0].max);
				setSideBarIndex(0);
			}

		});

		observer.observe(appRef.current);
		return () => {
			observer.disconnect();
		}
	}, []);

	// Logic to resize the side bar...
	useEffect(() => {
		const resizer = resizerRef.current;
		const sideBar = sideBarRef.current;
		let tempIndex = 0;

		const onMouseMove = (event) => {
			const mousePosX = event.clientX;

			for(let i=0; i<sizeInterval.length; i++){
				if( i === 0){
					if(mousePosX > 0 && mousePosX < sizeInterval[0].max) {
						sideBar.style.minWidth = numToPx(sizeInterval[0].min);
						sideBar.style.maxWidth = numToPx(sizeInterval[0].max);
						sideBar.style.width = numToPx(mousePosX);
						tempIndex = 0;
					}
				}else{
					if(mousePosX > sizeInterval[i].min && mousePosX < sizeInterval[i].max) {
						let minWidth = sizeInterval[i].min;
						let maxWidth = sizeInterval[i].max;
						if(mousePosX + MIN_WIDTH_MAIN >= getStyleValue(appRef, 'width')) {
							maxWidth = getStyleValue(appRef, 'width') - MIN_WIDTH_MAIN;
						}

						if(minWidth < maxWidth){
							sideBar.style.minWidth = numToPx(minWidth);
							sideBar.style.maxWidth = numToPx(maxWidth);
							sideBar.style.width = numToPx(mousePosX);
							tempIndex = i;
						}
					}
				}
			}
		}

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			setSideBarIndex(tempIndex);
		}

		const onMouseDown = () => {
			window.addEventListener('mousemove', onMouseMove)
		}

		resizer.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);

		return () => {
			resizer.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mouseup', onMouseUp);
		}

	}, [sideBarRef, resizerRef]);

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
