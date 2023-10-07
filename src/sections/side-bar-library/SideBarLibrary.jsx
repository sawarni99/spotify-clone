import './SideBarLibrary.css'
import React from 'react'
import LongCard from '../../components/long-card/LongCard'
import Card from '../../components/card/Card'
import { widthStates } from '../../utils/Constants'
import { useResize } from '../../hooks/hooks'

export default function SideBarLibrary({widthState, parentRef}) {

    const parentSizeState = useResize(parentRef, [1100,900,700]);

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
        <div className='side-bar-library'>
            <div className="side-bar-library-shadow" />

            {
                widthState === widthStates.large ?

                <div style={style} className="side-bar-library-large">
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                    <Card plain />
                </div>:
                <div className="side-bar-library-small">
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                    <LongCard plain noDesc={noDesc} />
                </div>
            }
        </div>
    )
}
