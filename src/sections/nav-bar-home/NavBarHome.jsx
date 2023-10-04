import './NavBarHome.css';
import LongCard from '../../components/long-card/LongCard';
import { getGreetings } from '../../utils/Helper'
import React from 'react'

export default function NavBarHome({parentRef, data, sizeState}) {
    let childStyle = {};

    if(sizeState === 2) {
        childStyle = {
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr 1fr 1fr',
        }
    } else if(sizeState === 1) {
        childStyle = {
            gridTemplateRows: '1fr 1fr 1fr',
            gridTemplateColumns: '1fr 1fr',
        }
    } else {
        childStyle = {
            gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateColumns: '1fr',
        }
    }

    return (
        <div className="nav-bar-home">
            <div className="nav-bar-home-head">
                {getGreetings()}
            </div>
            <div style={childStyle} className="nav-bar-home-body">
                <LongCard />
                <LongCard />
                <LongCard />
                <LongCard />
                <LongCard />
                <LongCard />
            </div>
        </div>
    );
}
