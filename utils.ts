export enum BUBBLES {
    BIKES = 'BIKES',
    BEATS = 'BEATS',
    BEERS = 'BEERS',
}

// import google maps api
import { Client, PlaceData, PlacesNearbyRanking, TravelMode, TravelRestriction, UnitSystem } from '@googlemaps/google-maps-services-js'
const client = new Client({})

/* ---------- FETCH DESTINATION ---------- */
export const fetchBeer = async (lat: string | string[], lng: string | string[], radius: string | string[]): Promise<Partial<PlaceData> | string> => {
  try {
    const response = await client.placesNearby({
      params: {
          location: [parseFloat(lat.toString()), parseFloat(lng.toString())],
          radius: parseFloat(radius.toString()!), // metres
          keyword: 'bar',
          opennow: true,
          key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })

    return response.data.results[Math.floor(Math.random()*response.data.results.length)]
  } catch(err) {
    return `beer, ${err}`
  }
}

const mapMoodToPlaylistKeyword = (mood: string | string[]) => {
  const relaxing = ['chill indie', 'chill hip hop', 'indie', 'k-indie', 'clouds']
  const sweating = ['french hip hop', 'techno', 'kpop', 'festive', 'party']
  const whatevering = ['love', 'boyfriend', 'girlfriend', 'paris', 'justin bieber']

  if (mood === 'RELAX') {
    return relaxing[Math.floor(Math.random()*relaxing.length)]
  } else if (mood === 'SWEAT') {
    return sweating [Math.floor(Math.random()*sweating.length)]
  } else if (mood === 'WHATEVER') {
    return  whatevering[Math.floor(Math.random()*whatevering.length)]
  }
}

/* ---------- FETCH PLAYLIST ---------- */
export const fetchPlaylist = async (mood: string | string[]) => {
  const keyword = mapMoodToPlaylistKeyword(mood)

  const getAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: new URLSearchParams({
        grant_type: "client_credentials"
      }),
    })

    const auth = await response.json()
    return auth.access_token
  };

  try {
    const accessToken = await getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=playlist&limit=20`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(r => r.json())

    const data = response.playlists.items[Math.floor(Math.random()*response.playlists.items.length)]

    const results = [
      data.name,
      data.external_urls.spotify,
      data.description,
      data.images[0].url
      ]
    return results
  } catch(err) {
    return console.log('fetch playlist', err)
  }
}

// fix type
/* ---------- FETCH BIKE RIDE DETAILS ---------- */
export const fetchBikeRide = async (destination: any, lat: string | string[], lng: string | string[]) => {
  try {
    if (typeof destination !== 'string') {
      const distance = await client.distancematrix({
        params: {
          origins: [[parseFloat(lat.toString()), parseFloat(lng.toString())]],
          destinations: [destination.vicinity!],
          mode: TravelMode.bicycling,
          avoid: [TravelRestriction.tolls, TravelRestriction.highways, TravelRestriction.ferries],
          units: UnitSystem.metric,
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000
      })
      // console.log(distance.data.rows[0].elements[0].distance)
      // console.log(distance.data.rows[0].elements[0].duration)
      return {
        distance: distance.data.rows[0].elements[0].distance.text,
        duration: distance.data.rows[0].elements[0].duration.text
      }
      // return distance
    }
  } catch(err) {
    return console.log('distance', err)
  }
}

/* ---------- FETCH DESTINATION DETAILS ---------- */
export const fetchDetails = async (destination: any) => {
  if (typeof destination !== 'string') {
    try {
      const response = await client.placeDetails({
        params: {
          place_id: destination.place_id!,
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,
      })

      return {
        hours: response.data.result.opening_hours,
        url: response.data.result.url,
        review: response.data.result.reviews![Math.floor(Math.random()*response.data.result.reviews!.length)].text
      }
    } catch(err) {
      return console.log('details', err)
    }
  }
}

/* ---------- FETCH WEATHER ---------- */
export const fetchWeather = async (lat: string | string[], lng: string | string[]) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_KEY}`)
    const data = await response.json()
    return {
      temp: data.main.temp - 273.15,
      description: data.weather[0].description,
    }
  } catch(err) {
    return console.log('weather', err)
  }
}