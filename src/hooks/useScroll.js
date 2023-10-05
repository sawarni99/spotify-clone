import { useEffect, useState } from 'react'

export default function useScroll(ref, height) {

    const [ isScrolled, setIsScrolled ] = useState(false);
    const reference = ref.current;
    
    useEffect(() => {

        if(reference === null) return () => {
            setIsScrolled(false);
        };
        
        const onScroll = (event) => {
            const scrollTop = event.currentTarget.scrollTop;
            if( scrollTop >= height ) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        
        reference.addEventListener('scroll', onScroll);
        
        return () => {
            reference.removeEventListener('scroll', onScroll);
        }

    }, [reference, height]);

    return isScrolled;
}
