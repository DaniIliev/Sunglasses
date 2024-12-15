import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'
const SearchBar = () => {
  return (
    <div className='searchBarBox'>
        <input type="text" placeholder="Search.." name="search" className='searchBar'/>
        <SearchIcon type='submit' className='searchIcon'/>
    </div>
  )
}

export default SearchBar