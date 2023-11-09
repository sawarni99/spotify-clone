import './SideBarLibrary.css'
import React, { useRef } from 'react'
import LongCard from '../../components/long-card/LongCard'
import Card from '../../components/card/Card'
import { widthStates } from '../../utils/Constants'
import { useResize, useScroll } from '../../hooks/hooks'
import { useAPI } from '../../hooks/hooks'
import { FAILURE, TOP10_USER_LIBRARY } from '../../utils/ApiUtil'

export default function SideBarLibrary({widthState, parentRef}) {

    const parentSizeState = useResize(parentRef, [1100,900,700]);
    const mainRef = useRef(null);
    const scrolled = useScroll(mainRef, 1);
    const libraryRes = useAPI(TOP10_USER_LIBRARY);
    let libraryData = [];
    
    if(libraryRes !== null) {
        if(libraryRes.status === FAILURE) {
            // TODO :: Have to handle here... 
            console.log(libraryRes);
        } else {
            libraryData = libraryRes.result.items;
        }
    }

    let noDesc = false
    if(widthState === widthStates.small){
        noDesc = true;
    } else {
        noDesc = false;
    }

    let style = {}
    switch(parentSizeState) {
        case 0:
            style = {
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }
            break;
        case 1:
            style = {
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'
            }
            break;
        case 2:
            style = {
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'
            }
            break;
        default:
            style = {
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
            }
            break;
    }


    return (
        <div className='side-bar-library' ref={mainRef}>
            { scrolled && !noDesc && <div className="side-bar-library-shadow" /> }

            {
                widthState === widthStates.large ?

                <div style={style} className="side-bar-library-large">
                    {
                        libraryData.map(({id, image_url, name}) => {
                            return <Card plain key={id} src={image_url} name={name}/>
                        })
                    }
                </div>:
                <div className="side-bar-library-small">
                    {
                        libraryData.map(({id, image_url, name}) => {
                            return <LongCard plain noDesc={noDesc} key={id} src={image_url} name={name} />
                        })
                    }
                </div>
            }
        </div>
    )
}
