import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { getGeoLocation } from '../api/geo-location'
import { GeoLocation } from '../api/types'
import { getWeather } from '../api/weather'
import { Context, initialWeatherData } from '../App'
import { checkingDuplicateInHistory } from '../utils/storage'
import { useLocalStorage } from './useLocalStorage'
import { SearchType, useSearch } from './useSearch'

type SearchActionProps = {
  search: SearchType
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type SearchActionResult = {
  /**
   * This function is used to get geolocation from city and country and then get weather data
   * @returns void
   */
  searchClick: () => void
  /**
   * This function is used to clear search input and history data in local storage
   * @returns void
   */
  clearClick: () => void
}

/**
 * hooks to handle search action, including search and clear
 * @param props {search, handleSearch}
 * @returns {searchClick, clearClick}
 */
export const useSearchAction = (props: SearchActionProps): SearchActionResult => {
  const { search, handleSearch } = props
  const { changeWeatherData, handleDeleteItem, historyData, setSearchLoading, setSearchError } = useContext(Context)

  const searchClick = async (): Promise<void> => {
    setSearchLoading(true)
    setSearchError(false)
    try {
      const location = await getGeoLocation(search.city, search.country)
      if (location) {
        const weather = await getWeather(location.lat, location.lng)
        if (weather) {
          toast.success('Search success')
          changeWeatherData(weather, search)
        } else {
          changeWeatherData(initialWeatherData, search)
        }
      } else {
        setSearchError(true)
        toast.error('Cannot find location')
        changeWeatherData(initialWeatherData, search)
      }
    } catch (error) {
      console.error('Error search weather', error)
    }
    setSearchLoading(false)
  }

  const clearClick = (): void => {
    handleSearch({ target: { value: '', name: 'city' } } as React.ChangeEvent<HTMLInputElement>)
    handleSearch({ target: { value: '', name: 'country' } } as React.ChangeEvent<HTMLInputElement>)
    historyData.forEach((item) => {
      handleDeleteItem(item)
    })
    changeWeatherData(initialWeatherData, { city: '', country: '' })
  }

  return { searchClick, clearClick }
}