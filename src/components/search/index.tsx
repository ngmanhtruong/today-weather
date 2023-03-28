import React from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useSearchAction } from '../../hooks/useSearchAction'
import SearchBox from '../search-box'
import './index.scss'

const Search = () => {
  const { search, handleSearch } = useSearch()
  const { clearClick, searchClick } = useSearchAction({ search, handleSearch })

  return (
    <div className='search'>
      <div className="search__wrapper">
        <div className='search__container'>
          <p>City: </p>
          <SearchBox name='city' value={search} onChange={handleSearch}/>
        </div>
        <div className='search__container'>
          <p>Country: </p>
          <SearchBox name='country' value={search} onChange={handleSearch}/>
        </div>
      </div>
      <div className="search__action">
        <button onClick={searchClick}>Search</button>
        <button onClick={clearClick}>Clear</button>
      </div>
    </div>
  )
}

export default Search