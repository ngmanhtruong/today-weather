import { GeoEndpoint, GeoAPIKey } from "./constants";
import { GeoLocation } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const getGeoLocation = async (city: string, country: string): Promise<GeoLocation | null> => {
  const apiKey = GeoAPIKey
  const endpoint = GeoEndpoint

  if (!city && !country) {
    console.error('City or country is missing')
    toast.warn('City or country is missing')
    return null
  }

  try {
    const response = await axios.get(`${endpoint}?q=${city},${country}&key=${apiKey}`)
    const {results} = response.data
    if (results.length > 0) {
      const {lat, lng} = results[0].geometry
      return {lat, lng}
    } else {
      console.error('No results found')
      return null
    }
  } catch (error) {
    console.error('Error fetching geo location', error)
    return null
  }
}