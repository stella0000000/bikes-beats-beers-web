export type WxData = {
  temp: number;
  description: string;
};

/**
 *
 * @param lat
 * @param lng
 * @returns temp, wx conditions
 */

export const fetchWeather = async (
  lat: string | string[],
  lng: string | string[]
) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`
    );
    const data = await response.json();
    const result: WxData = {
      temp: data.main.temp - 273.15,
      description: data.weather[0].description,
    };

    return result;
  } catch (err) {
    return console.log("Weather", err);
  }
};
