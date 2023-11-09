import './NavBarHome.css';
import LongCard from '../../components/long-card/LongCard';
import { getGreetings } from '../../utils/Helper';
import { useAPI } from '../../hooks/hooks';
import { USER_LIBRARY, FAILURE } from '../../utils/ApiUtil';
import React from 'react'

export default function NavBarHome({sizeState}) {
    let childStyle = {};

    const libraryRes = useAPI(USER_LIBRARY, "limit=6");
    let libraryData = [];
    
    if(libraryRes !== null) {
        if(libraryRes.status === FAILURE) {
            // TODO :: Have to handle here... 
            console.log(libraryRes);
        } else {
            libraryData = libraryRes.result.items;
        }
    }
    if(sizeState === 2) {
        childStyle = {
            gridTemplateColumns: '1fr 1fr 1fr',
        }
    } else if(sizeState === 1) {
        childStyle = {
            gridTemplateColumns: '1fr 1fr',
        }
    } else {
        childStyle = {
            gridTemplateColumns: '1fr',
        }
    }

    return (
        <div className="nav-bar-home">
            <div className="nav-bar-home-head">
                {getGreetings()}
            </div>
            <div style={childStyle} className="nav-bar-home-body">
                {
                    libraryData.map(({id, image_url, name}) => {
                        return <LongCard key={id} src={image_url} name={name} />
                    })
                }
            </div>
        </div>
    );
}
