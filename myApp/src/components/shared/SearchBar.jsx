import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'
import { SunglassesContext } from '../../context/SunglassesContext';
const SearchBar = () => {

  const {filterValues, setFilterValues,} = useContext(SunglassesContext)
    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setFilterValues(prev => ({...prev, query: searchText}))
    }

  return (
        <div className="searchBarBox">
            <input
                type="text"
                placeholder="Search sunglasses..."
                value={filterValues.query}
                onChange={handleSearch}
                className="searchBar"
            />
            <FaSearch className="searchIcon" />
        </div>
  )
}

export default SearchBar