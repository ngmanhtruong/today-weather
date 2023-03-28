import React, { useContext } from 'react'
import { Context } from '../../App'
import { convertUnixToString } from '../../utils/time'
import Loading from '../loading'
import './index.scss'

const SearchResult = () => {
  const {weatherData, searchLoading, searchError} = useContext(Context)

  return (
    <>
      {weatherData.name && !searchLoading && <div className="search-result">
        <div>
          <p className="gray">{weatherData.search?.city && weatherData.search?.country ? `${weatherData.search?.city}, ${weatherData.search?.country}` : weatherData.name}</p>
          <h1>{weatherData.weather[0].main}</h1>
          <div className='search-result__container'>
            <div className="search-result__properties">
              <p>Description:</p>
              <p>Temperature:</p>
              <p>Humidity:</p>
              <p>Time:</p>
            </div>
            <div className="search-result__information">
              <p>{weatherData.weather[0].description}</p>
              <p>{weatherData.main.temp_min}&deg;C ~ {weatherData.main.temp_max}&deg;C</p>
              <p>{weatherData.main.humidity}%</p>
              <p>{convertUnixToString(weatherData.dt)}</p>
            </div>
          </div>
        </div>
      </div>}
      {searchLoading && !searchError && 
        <div className="search-result">
          <Loading />
        </div>
      }
      {!weatherData.name && !searchLoading && searchError && 
        <div className="search-result__not-found">
          <p>Not found</p>
        </div>
      }
      {!weatherData.name && !searchError && !searchLoading && <div>
          <p>Search for a city</p>
        </div>}
    </>
  )
}

export default SearchResult