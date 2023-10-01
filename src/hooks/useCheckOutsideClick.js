import { useEffect } from 'react'

export default function useCheckOutsideClick(ref, setState, value) {

    useEffect(() => {

        const onClickOnWindow = (event) => {
            if(ref.current === null) return false;
            
            if(!ref.current.contains(event.target)) {
                setState(value);
            }

        }

        window.addEventListener('click', onClickOnWindow);

        return () => {
            window.removeEventListener('click', onClickOnWindow)
        }

    }, [ref, setState, value]);
}
