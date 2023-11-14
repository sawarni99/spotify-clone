import './Category.css'
import React from 'react'
import Card from '../../components/card/Card'
import {useResize} from '../../hooks/hooks';
import NavBar from '../../sections/nav-bar/NavBar';
import { useRef } from 'react';

export default function Category() {

    const mainRef = useRef(null);
    const widthState = useResize(mainRef, [1300, 1150, 1000, 770, 560]);

    let style = {};

	switch(widthState) {
		case 0 :
			style = {
				gridTemplateColumns: '1fr 1fr',
			}
			break;
		case 1:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr',
			}
			break;
		case 2:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr',
			}
			break;
		case 3:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
			}
			break;
		case 4:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
			}
			break;
		default:
			style = {
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
			}
	}
    
    return (
        <div className='category' ref={mainRef}>
            <NavBar page='category' parentRef={mainRef} info='Loading...' />
            <div style={style} className="category-body">
                <Card />
            </div>
        </div>
    )
}
