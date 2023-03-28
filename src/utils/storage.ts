import { WeatherData } from "../api/types";

/**
 * Function to check if the weather data is already in the history
 * @param data weather data
 * @param history history of weather searched in local storage
 * @returns {boolean}
 */
export const checkingDuplicateInHistory = (data: WeatherData, history: WeatherData[]): boolean => {
  if (history.length === 0) {
    return false
  }
  const duplicate = history.find((item) => {
    return (item.search?.city.toLowerCase() === data.search?.city.toLowerCase() && item.search?.country.toLowerCase() === data.search?.country.toLowerCase())
  })
  if (duplicate) {
    return true
  }
  return false
}