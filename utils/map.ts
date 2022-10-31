import {
  Client,
  PlaceData,
  TravelMode,
  TravelRestriction,
  UnitSystem } from '@googlemaps/google-maps-services-js'
import { BREW } from '@utils/constants'

const googleMaps = new Client({})

/**
 * 
 * @param lat 
 * @param lng 
 * @param radius 
 * @returns destination
 */

export const fetchBrew = async (brew: string | string[] | undefined, lat: string | string[], lng: string | string[], radius: string | string[]): Promise<Partial<PlaceData> | string> => {
  const keyword = brew === BREW.COFFEE ? 'coffee' : 'bar'

  try {
    const response = await googleMaps.placesNearby({
      params: {
          location: [parseFloat(lat.toString()), parseFloat(lng.toString())],
          radius: parseFloat(radius.toString()!), // meters
          keyword,
          opennow: true,
          key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })

    return response.data.results[Math.floor(Math.random()*response.data.results.length)]
  } catch(err) {
    return `brew, ${err}`
  }
}


// fix type
/**
 * 
 * @param destination 
 * @param lat 
 * @param lng 
 * @returns bike ride distance, duration
 */

export const fetchBikeRide = async (destination: any, lat: string | string[], lng: string | string[]) => {
  try {
    if (typeof destination !== 'string') {
      const distance = await googleMaps.distancematrix({
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


/**
 * 
 * @param destination
 * @returns hours, url, review
 */

export const fetchDetails = async (destination: any) => {
  if (typeof destination !== 'string') {
    try {
      const response = await googleMaps.placeDetails({
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