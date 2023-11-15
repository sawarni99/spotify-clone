import './Category.css'
import React from 'react'
import Card from '../../components/card/Card'
import {useAPI, useResize} from '../../hooks/hooks';
import NavBar from '../../sections/nav-bar/NavBar';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY, CATEGORY_PLAYLISTS, SUCCESS } from '../../utils/ApiUtil';
import { getColorByName, getLocalStorage } from '../../utils/Helper';
import { COUNTRY_KEY } from '../../utils/AuthUtil';

export default function Category() {

    const mainRef = useRef(null);
    const widthState = useResize(mainRef, [1300, 1150, 1000, 770, 560]);
	const [ searchParams ] = useSearchParams();
	const id = searchParams.get('id');
	const playlists_res = useAPI(CATEGORY_PLAYLISTS, `limit=10&country=${getLocalStorage(COUNTRY_KEY)}`, id);
	const category_res = useAPI(CATEGORY, `country=${getLocalStorage(COUNTRY_KEY)}`, id);

	let categoryName = 'Loading...';
	let color = null;
	if(category_res !== null && category_res.status === SUCCESS) {
		categoryName = category_res.result.name;
		color = getColorByName(categoryName);
	}

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
            <NavBar page='category' parentRef={mainRef} info={categoryName} color={color} />
            <div style={style} className="category-body">
                {
					playlists_res !== null && playlists_res.status === SUCCESS &&
					playlists_res.result.items.map(
						({id, name, image_url, description}) => 
							<Card 
								key={id} 
								name={name} 
								src={image_url} 
								desc={description} 
							/>
					)
				}
            </div>
        </div>
    )
}
