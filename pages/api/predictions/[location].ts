import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceAutocompleteResult} from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function predictions(
  req: NextApiRequest,
  res: NextApiResponse<PlaceAutocompleteResult[] | any> // fix type
) {
  const location = req.query.location?.toString();

  if (location) {
    try {
      const resp = await client.placeAutocomplete({
        params: {
          input: location,
          // nput: 'Paris',
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,
      })
      res.status(200).json(resp.data.predictions)

      // console.log(resp.data.predictions)
    } catch(error) {
      res.status(500).json(error)
      res.end()
    }
  }
}