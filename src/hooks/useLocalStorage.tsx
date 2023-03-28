import { useState } from "react"

type UseLocalStorageResult = {
  /**
   * Stored value in local storage
   */
  storedValue: any
  /**
   * Set value to local storage and update storedValue
   * @param value value to store in local storage
   * @returns void
   */
  setValue: (value: any) => void
}

/**
 * This function is used to store and get data from local storage
 * @param key name of value to store in local storage
 * @param initialValue init data of value
 * @returns <storedValue, setValue>
 */
export const useLocalStorage = (key: string, initialValue: any): UseLocalStorageResult => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: any): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return {storedValue, setValue}
}