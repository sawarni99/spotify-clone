import { useEffect, useState } from 'react'

// Sizes shoul be in desc order...
// [1300, 1150, 1000, 770, 560]

export default function useResize(ref, sizes) {

    const [ widthState, setWidthState ] = useState(0);

    useEffect(() => {
        
        const observer = new ResizeObserver((entries) => {
            let size = sizes.length;
            const width = entries[0].contentRect.width;
            for(let i=0; i<sizes.length; i++) {
                if(width < sizes[i]) {
                    size = sizes.length - i - 1;
                }
            }
            setWidthState(size);
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [ref, sizes]);

    return widthState;
}
