import { useEffect, useState } from "react"

export default function useHover(mainRef) {

  const [state, setState] = useState('unselected');

  useEffect(() => {
    const main = mainRef.current;
    
    const onMouseOver = () => {
      if(state !== 'selected') {
        setState('hover');
      }
    }

    const onMouseOut = () => {
      if(state !== 'selected') {
        setState('unselected');
      }
    }

    main.addEventListener('mouseover', onMouseOver);
    main.addEventListener('mouseout', onMouseOut);

    return () => {
      main.removeEventListener('mouseover', onMouseOver);
      main.removeEventListener('mouseout', onMouseOut);
    }

  }, [mainRef, state]);

  return [ state, setState ];
}