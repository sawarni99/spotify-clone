import { useRef, useEffect, useState } from 'react';
import { numToPx, pxToNum } from './helper/StyleHelper';
import './App.css';

/*
    State 0 = min-width = 72px, max-width = 72px
    State 1 = min-width = 280px (18.5%) , max-width = 420px (27.5%)
    State 2 = min-width = 584px (38.5%), max-width = 1096px (72.5%)
*/

const sizeInterval = [{min: 72, max: 72}, {min: 280, max: 420}, {min: 584, max: 1096}]
const INITIAL_INDEX = 0;

function App() {
	const sideBarRef = useRef(null);
	const resizerRef = useRef(null);
	const appRef = useRef(null);
	const [sideBarIndex, setSideBarIndex] = useState(INITIAL_INDEX);
	const currentSideBarWidth = useRef(null);

	// Initializing initial width...
	useEffect(() => {
		sideBarRef.current.style.width = numToPx(sizeInterval[INITIAL_INDEX].min);
		currentSideBarWidth.current = sideBarRef.current.style.width;
	}, [])

	// Logic while resizing window...
	useEffect(() => {
		const windowWidth = window.innerWidth;
		const sideBar = sideBarRef.current;
		const observer = new ResizeObserver((entries) => {

			const appWidth = entries[0].contentRect.left + entries[0].contentRect.right;
			console.log(windowWidth, appWidth)
			if(appWidth > sizeInterval[2].max && appWidth < 1450){
				sideBar.style.maxWidth = numToPx(sizeInterval[1].max);
				sideBar.style.minWidth = numToPx(sizeInterval[1].min);
			}

			if(appWidth > sizeInterval[2].min && appWidth < sizeInterval[2].max){
				sideBar.style.maxWidth = numToPx(sizeInterval[0].max);
				sideBar.style.minWidth = numToPx(sizeInterval[0].min);
			}

			// const widthChangeRatio = appWidth/windowWidth;
			// console.log(currentSideBarWidth.current)
			// sideBar.style.width = numToPx(pxToNum(currentSideBarWidth.current) * widthChangeRatio);
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
						sideBar.style.minWidth = numToPx(sizeInterval[i].min);
						sideBar.style.maxWidth = numToPx(sizeInterval[i].max);
						sideBar.style.width = numToPx(mousePosX);
						tempIndex = i;
					}
				}
			}

			currentSideBarWidth.current = sideBar.style.width;
		}

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			// console.log('New', currentSideBarWidth.current);
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
