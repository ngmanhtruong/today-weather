import React, { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Search from './components/search'
import SearchResult from './components/search-result'
import SearchHistory from './components/search-history'
import { WeatherData } from './api/types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { SearchType } from './hooks/useSearch'
import { checkingDuplicateInHistory } from './utils/storage'
import { ToastContainer } from 'react-toastify'

type ContextType = {
  weatherData: WeatherData
  /**
   * Function to change weather data display and store in local storage if it is not in history
   * @param data WeatherData
   * @param search SearchType
   * @returns void
   */
  changeWeatherData: (data: WeatherData, search: SearchType) => void
  /**
   * History data
   */
  historyData: WeatherData[],
  /**
   * Function to delete item in history
   * @param data WeatherData
   * @returns void
   */
  handleDeleteItem: (data: WeatherData) => void
  /**
   * Loading status of search
   */
  searchLoading: boolean
  /**
   * Function to change search loading status
   */
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * Error status of search
   */
  searchError: boolean
  /**
   * Function to change search error status
   */
  setSearchError: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Initial weather data
 */
export const initialWeatherData: WeatherData = {
  weather: [
    {
      id: 0,
      main: '',
      description: '',
      icon: '',
    },
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  dt: 0,
  name: '',
  search: {
    city: '',
    country: '',
  }
}

/**
 * Context to store global data, because this is a test so I don't split it into different context
 */
export const Context = React.createContext<ContextType>({
  weatherData: initialWeatherData,
  changeWeatherData: () => {},
  historyData: [],
  handleDeleteItem: () => {},
  searchLoading: false,
  setSearchLoading: () => {},
  searchError: false,
  setSearchError: () => {},
})

function App() {
  const {storedValue, setValue} = useLocalStorage('weatherData', initialWeatherData)
  const {storedValue: history, setValue: setHistory} = useLocalStorage('history', [])
  const [weatherData, setWeatherData] = useState<WeatherData>(storedValue)
  const [historyData, setHistoryData] = useState<WeatherData[]>(history)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<boolean>(false)

  const changeWeatherData = (data: WeatherData, search: SearchType): void => {
    let newWeatherData = {...data, search: {...search}}
    setWeatherData(newWeatherData)
    setValue(newWeatherData)

    if (!checkingDuplicateInHistory(newWeatherData, history) && data.name !== '') {
      setHistory([...history, newWeatherData])
      setHistoryData([...history, newWeatherData])
    }
  }

  const handleDeleteItem = (data: WeatherData): void => {
    const newHistory = historyData.filter((item: WeatherData) => item.dt !== data.dt)
    setHistoryData(newHistory)
    setHistory(newHistory)
  }

  return (
    <Context.Provider value={{
      weatherData,
      changeWeatherData,
      historyData,
      handleDeleteItem,
      searchLoading,
      setSearchLoading,
      searchError,
      setSearchError
    }}>
      <div className="app">
        <header>
          <h3>Today's Weather</h3>
        </header>
        <hr />
        <Search />
        <SearchResult />
        <SearchHistory />
      </div>
      <ToastContainer />
    </Context.Provider>
  )
}

export default App
