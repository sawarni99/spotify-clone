import { useEffect } from 'react'

export default function useCheckOutsideClick(ref, setShowMenu) {

    useEffect(() => {

        const onClickOnWindow = (event) => {
            if(ref.current === null) return false;
            
            if(!ref.current.contains(event.target)) {
                setShowMenu(false);
            }

        }

        window.addEventListener('click', onClickOnWindow);

        return () => {
            window.removeEventListener('click', onClickOnWindow)
        }

    }, [ref]);
}
