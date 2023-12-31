import { useEffect, useState } from 'react'
import { sizeInterval, INITIAL_INDEX, MIN_WIDTH_MAIN } from '../utils/Constants';
import { getStyleValue, numToPx } from '../utils/StyleUtil';

export default function useResizeAll(appRef, sideBarRef, resizerRef) {
    const [sideBarIndex, setSideBarIndex] = useState(INITIAL_INDEX);

	// To set the sidebar index from outside...
	const setCustomSideBarIndex = (value) => {

		if(typeof value !== 'number') return;

		const sideBar = sideBarRef;
		let minWidth = sizeInterval[value].min;
		let maxWidth = sizeInterval[value].max;

		if(minWidth + MIN_WIDTH_MAIN >= getStyleValue(appRef, 'width')) return;

		if(maxWidth + MIN_WIDTH_MAIN >= getStyleValue(appRef, 'width')) {
			maxWidth = getStyleValue(appRef, 'width') - MIN_WIDTH_MAIN;
		}

		sideBar.style.minWidth = numToPx(minWidth);
		sideBar.style.maxWidth = numToPx(maxWidth);

		setSideBarIndex(value);
	}

	useEffect(() => {
		
		const sideBar = sideBarRef;
        const resizer = resizerRef;

		if(sideBar === null || sideBar === undefined) {
			return;
		}

        sideBarRef.style.width = numToPx(sizeInterval[INITIAL_INDEX].min);

        // Logic while resizing window...
		const observer = new ResizeObserver((entries) => {
			const appWidth = entries[0].contentRect.width;
			if(appWidth > 400){
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
			}else {
				sideBar.style.minWidth = numToPx(0);
				sideBar.style.maxWidth = numToPx(0);
			}

		});


        // Logic while resizing SideBar...
        const onMouseMove = (event) => {
			const mousePosX = event.clientX;
			console.log(mousePosX);

			for(let i=0; i<sizeInterval.length; i++){
				if( i === 0){
					if(mousePosX > 0 && mousePosX < sizeInterval[0].max) {
						sideBar.style.width = numToPx(mousePosX);
						sideBar.style.minWidth = numToPx(sizeInterval[0].min);
						sideBar.style.maxWidth = numToPx(sizeInterval[0].max);
                        setSideBarIndex(0);
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
                            setSideBarIndex(i);
						}
					}
				}
                
			}
		}

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
		}

		const onMouseDown = () => {
			window.addEventListener('mousemove', onMouseMove)
		}

		resizer.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);

		observer.observe(appRef);
		return () => {
			observer.disconnect();
            resizer.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mouseup', onMouseUp);
		}
	}, [appRef, sideBarRef, resizerRef]);

    return [ sideBarIndex, setCustomSideBarIndex ];
}
