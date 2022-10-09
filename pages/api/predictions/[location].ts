import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceAutocompleteResult} from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default function predictions(
  req: NextApiRequest,
  res: NextApiResponse<PlaceAutocompleteResult[] | string>
) {
  const input = req.query.location?.toString();

  if (input) {
    client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })
    .then(r => res.status(200).json(r.data.predictions))
    .catch(e => res.status(500).json(e.response.data.error_message))
  }
}