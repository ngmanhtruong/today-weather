import React, { useContext, useEffect, useState } from 'react'
import { WeatherData } from '../../api/types'
import { Context } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import SearchItem from '../search-item'
import './index.scss'

const SearchHistory = () => {
  const {historyData} = useContext(Context)
  
  return (
    <div className="search-history">
      <h3>Search History</h3>
      <hr />
      {historyData.length === 0 && <div className="search-history__no-record">
          <p>No record</p>
      </div>}
      {historyData.length > 0 && <div className="search-history__container">
        {historyData.map((item: WeatherData, index: number) => (
          <SearchItem data={item} index={index} key={index}/>
          )
        )}
      </div>}
    </div>
  )
}

export default SearchHistory