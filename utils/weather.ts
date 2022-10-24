/**
 * 
 * @param lat 
 * @param lng 
 * @returns temp, wx conditions
 */

 export const fetchWeather = async (lat: string | string[], lng: string | string[]) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`)
      const data = await response.json()
      return {
        temp: data.main.temp - 273.15,
        description: data.weather[0].description,
      }
    } catch(err) {
      return console.log('weather', err)
    }
  }