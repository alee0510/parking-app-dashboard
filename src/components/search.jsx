import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

// import style
import '../styles/search.scss'

export default function (props) {
    return (
        <div className = 'search-main-container'>
            <div id = 'search-icon'>
                <SearchIcon/>
            </div>
            <input 
                type = 'text' 
                placeholder = 'Search . . .' 
            />
        </div>
    )
}