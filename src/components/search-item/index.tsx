import React, { useContext } from 'react'
import { WeatherData } from '../../api/types'
import { convertUnixToTime } from '../../utils/time'
import SearchSVG from '../../assets/icon-search.svg'
import DeleteSVG from '../../assets/icon-delete.svg'
import './index.scss'
import { Context } from '../../App'

type SearchItemProps = {
  data: WeatherData
  index: number
}

const SearchItem = (props: SearchItemProps) => {
  const { data, index } = props
  const {changeWeatherData, handleDeleteItem} = useContext(Context)
  const order = index + 1

  const handleSearch = (): void => {
    changeWeatherData(data, data.search ?? {city: '', country: ''})
  }

  const handleDelete = (): void => {
    handleDeleteItem(data)
  }

  return (
    <div className="search-item">
      <div className="search-item__content" key={index}>
        <div className="search-item__info">
          <p>{order}. {data.search?.city && data.search?.country ? `${data.search?.city}, ${data.search?.country}` : data.name}</p>
          <p>{convertUnixToTime(data.dt)}</p>
        </div>
        <div className="search-item__action">
          <div className="search-item__action__wrapper">
            <img src={SearchSVG} alt="search" onClick={handleSearch} />
          </div>
          <div className="search-item__action__wrapper">
            <img src={DeleteSVG} alt="delete" onClick={handleDelete}/>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SearchItem