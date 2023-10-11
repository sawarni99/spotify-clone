import { useEffect, useState } from "react";
// import {getStyleValue, pxToNum} from '../../utils/StyleUtil';

export default function useProgress(barRef, progressRef, setProgress) {

    // const [clicked, setClicked] = useState(false);

    const getPositionPercent = (event, bar) => {
        const barLeft = bar.getBoundingClientRect().left;
        const barWidth = bar.getBoundingClientRect().width;
        const position = event.clientX;
        const progressPercent = (position-barLeft)/barWidth*100;
        return progressPercent;
    }

    useEffect(() => {

        const bar = barRef.current;
        const progress = progressRef.current;

        const onMouseMove = (event) => {
            const progressPercent = getPositionPercent(event, bar);

            if(progressPercent < 0) {
                setProgress(0);
            }else if(progressPercent > 100) {
                setProgress(100);
            } else {
                setProgress(progressPercent);
            }
        }
        
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
        
        const onMouseDown = (event) => {
            window.addEventListener('mousemove', onMouseMove);
            
            const progressPercent = getPositionPercent(event, bar);
            setProgress(progressPercent);
        }
        

        if(barRef !== undefined && bar !== null) {
            bar.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            if(barRef !== undefined && bar !== null) {
                bar.removeEventListener('mousedown', onMouseDown);
            }
			window.removeEventListener('mouseup', onMouseUp);
        }

    }, [barRef, progressRef, setProgress]);

    // return clicked;
}
