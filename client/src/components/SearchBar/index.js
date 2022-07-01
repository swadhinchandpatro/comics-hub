import React, { useContext } from 'react'
import { SuperHeroContext } from '../../App'
import { debounce } from '../../helpers/debounce'
import './styles.scss'

export default function SearchBar() {
    const { setComicHandler } = useContext(SuperHeroContext)
    const debouncedSearch = debounce(setComicHandler, 500);
    return (
        <div className='search-bar'>
            <input type="text" onChange={e => debouncedSearch(e.target.value)} placeholder='Search comic title...'/>
        </div>
    )
}
