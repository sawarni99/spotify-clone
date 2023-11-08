import React from 'react'
import './Loading.css'

export default function Loading(size, color) {

    let classSize = null;
    let classColor = null;

    switch(size) {
        case "small" :
            classSize = "loading-size-small";
            break;
        case "large" :
            classSize = "loading-size-large";
            break;
        default:
            classSize = "loading-size-small";
    }

    switch(color) {
        case "white":
            classColor = "loading-color-white";
            break;
        case "green":
            classColor = "loading-color-green";
            break;
        default:
            classColor = "loading-color-green";

    }

    const className = `loading ${classSize} ${classColor}`

    return (
        <div className={className}/>
    )
}
