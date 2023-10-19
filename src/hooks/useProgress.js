import { useEffect, useState } from "react";

export default function useProgress(barRef, progressRef, setProgress, duration) {

    const [clicked, setClicked] = useState(false);

    const getPositionPercent = (event, bar, duration) => {
        const barLeft = bar.getBoundingClientRect().left;
        const barWidth = bar.getBoundingClientRect().width;
        const position = event.clientX;
        const progressPercent = (position-barLeft)/barWidth*100;
        const roundedDuration = Math.round(progressPercent*duration/100);
        const roundedPercent = roundedDuration/duration*100;
        return roundedPercent;
    }

    useEffect(() => {

        const bar = barRef.current;

        const onMouseMove = (event) => {
            const progressPercent = getPositionPercent(event, bar, duration);

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

            setClicked(false);
        }
        
        const onMouseDown = (event) => {
            window.addEventListener('mousemove', onMouseMove);

            setClicked(true);
            const progressPercent = getPositionPercent(event, bar, duration);
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

    }, [barRef, progressRef, setProgress, duration]);

    return clicked;
}
