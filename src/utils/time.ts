/**
 * Converts unix time to a string of date and time in YYYY-MM-DD and 12 hour format
 * @param unixTime a time in number format, must be unix time
 * @returns date and time in 12 hour format
 */
export const convertUnixToString = (unixTime: number): string => {
  const date = new Date(unixTime * 1000).toLocaleString()
  // convert day to yyyy-mm-dd format
  const day = date.split(',')[0]
  const year = day.split('/')[2]
  const month = day.split('/')[0]
  const dayOfMonth = day.split('/')[1]
  const dateFormatted = `${year}-${month}-${dayOfMonth}`
  // convert time to 12 hour format
  const time = date.split(',')[1].trim() 
  const hours = parseInt(time.split(':')[0])
  const minutes = parseInt(time.split(':')[1])
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  const time12 = `${addZeroIfSingleDigit(hours12)}:${addZeroIfSingleDigit(minutes)} ${ampm}`
  return `${dateFormatted} ${time12}`
}

/**
 * Converts unix time to a string of time in 12 hour format with seconds
 * @param unixTime a time in number format, must be unix time
 * @returns time in 12 hour format with seconds
 */
export const convertUnixToTime = (unixTime: number): string => {
  const date = new Date(unixTime * 1000).toLocaleString()
  const time = date.split(',')[1].trim() 
  const hours = parseInt(time.split(':')[0])
  const minutes = parseInt(time.split(':')[1])
  const seconds = parseInt(time.split(':')[2])
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  const time12 = `${addZeroIfSingleDigit(hours12)}:${addZeroIfSingleDigit(minutes)}:${addZeroIfSingleDigit(seconds)} ${ampm}`
  return time12
}

/**
 * Add a leading zero to a number if the number is less than 10
 * @param num a number representing the hour or minute or second
 * @returns string of the number with a leading zero if the number is less than 10
 */
const addZeroIfSingleDigit = (num: number): string => {
  if (num < 10) {
    return `0${num}`
  }
  return num.toString()
}