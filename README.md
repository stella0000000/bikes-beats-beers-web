## Bikes beats and brews
- Share your location, desired transit time, and cycling mood.
- Be surprised with a playlist that suits your mood, and a destination to meet a friend.

## Technologies
- Next.js
- Google Maps API
- Spotify API
- styled-components

## `5:00-15:00 LT cafe mode`
<img width="550" alt="Screen Shot 2022-12-05 at 09 10 03 " src="https://user-images.githubusercontent.com/112890821/205657447-9ef2b4d9-2c2c-45c8-970c-b77a835196bd.png">
<img width="550" alt="Screen Shot 2022-12-05 at 09 10 25 " src="https://user-images.githubusercontent.com/112890821/205657477-c2a1d925-ca15-4135-b031-05e9084ce1e4.png">

## `15:00-5:00 LT bar mode`
<img width="550" alt="Screen Shot 2022-10-27 at 20 31 35 " src="https://user-images.githubusercontent.com/112890821/198422126-81eb4b55-cd08-412f-8655-53a425c2817f.png">
<img width="550" alt="Screen Shot 2022-10-27 at 20 31 51 " src="https://user-images.githubusercontent.com/112890821/198422138-44dade1b-b9fa-4360-bd62-bfc9c41c9d76.png">

## Get brew type
```javascript
export const getBrew = (hour: number) => {
  // between 5:00 - 15:00 coffee
  if (5 < hour && hour < 15) {
    return BREW.COFFEE
  } else {
    return BREW.BEER
  }
}
```

## Feed the brew type to find a destination: cafe or bar
```javascript
export const fetchBrew = async (
  brew: string | string[] | undefined,
  lat: string | string[],
  lng: string | string[],
  radius: string | string[]
):Promise<Partial<PlaceData> | string> => {
  const keyword = brew === BREW.COFFEE ? 'coffee' : 'bar'

  return new Promise(async (res, rej) => {
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
      return res(response.data.results[Math.floor(Math.random()*response.data.results.length)])  
    } catch(err: any) {
      rej(err.response.data.error_message)
    }
  }
  )
}
```

## Future considerations
- `Tailwind` for performance
