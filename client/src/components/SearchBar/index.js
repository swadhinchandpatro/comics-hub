import React from 'react'
import './styles.scss'

export default function SearchBar() {
    return (
        <div className='search-bar'>
            <input type="text" placeholder='Search comic title...'/>
        </div>
    )
}
