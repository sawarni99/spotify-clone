import './NavBarCategory.css'
import React from 'react'

export default function NavBarCategory({title}) {

    if(title === undefined || title === null) title = 'Loading...'
        
    return (
        <div className="nav-bar-category">
            {title}
        </div>
    )
}
