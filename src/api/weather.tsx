import axios from "axios";
import { WeatherEndpoint, WeatherAPIKey } from "./constants";
import { WeatherData, WeatherDataResponse } from "./types";

/**
 * Get weather data at a location with lat and long
 * @param lat lat location
 * @param lng long location
 * @returns {WeatherData}
 */
export const getWeather = async (lat: number, lng: number): Promise<WeatherData | null> => {
  const apiKey = WeatherAPIKey
  const endpoint = WeatherEndpoint

  if (!lat || !lng) {
    console.error('Lat or lng is missing')
    return null
  }

  try {
    const response = await axios.get(`${endpoint}?lat=${lat}&lon=${lng}&appid=${apiKey}`)
    const result: WeatherDataResponse = response.data
    if (result) {
      const weather: WeatherData = {
        weather: result.weather,
        main: result.main,
        dt: result.dt,
        name: result.name,
      }
      return weather
    }
    return null
  } catch (error) {
    console.error('Error fetching weather', error)
    return null
  }
}