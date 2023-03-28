import 'dotenv'

export const WeatherEndpoint = process.env.REACT_APP_WEATHER_ENDPOINT ? process.env.REACT_APP_WEATHER_ENDPOINT : 'https://api.openweathermap.org/data/2.5/weather'
export const WeatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY ? process.env.REACT_APP_WEATHER_API_KEY : 'c199b0b3b0774d5ba1768107e38a56ab'
export const GeoEndpoint = process.env.REACT_APP_GEO_ENDPOINT ? process.env.REACT_APP_GEO_ENDPOINT : 'https://api.opencagedata.com/geocode/v1/json'
export const GeoAPIKey = process.env.REACT_APP_GEO_API_KEY ? process.env.REACT_APP_GEO_API_KEY : '4e0979378c03416fb8888fd32fa82328'