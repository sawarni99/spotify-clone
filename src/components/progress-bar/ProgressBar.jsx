import './ProgressBar.css'
import React, { useEffect, useRef } from 'react'
import { useProgress } from '../../hooks/hooks';


export default function ProgressBar({progress, setProgress, onClicked}) {
	const barRef = useRef(null);
	const progressRef = useRef(null);
	useProgress(barRef, progressRef, setProgress);

	const progressStyle = {
		width: `${progress}%`,
	}

	return (
		<div ref={barRef} className='progress-bar'>
			<div ref={progressRef} style={progressStyle} className="progress-bar-progress">
				<div className="progress-bar-slider" />
			</div>
		</div>
	);
}
