import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default function coordinates(
  req: NextApiRequest,
  res: NextApiResponse<LatLngLiteral | undefined | string>
) {
  const place_id = req.query.placeID?.toString();

  if (place_id) {
    client.placeDetails({
      params: {
        place_id,
        key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,        
    })
    .then(r => res.status(200).json(r.data.result.geometry?.location))
    .catch(r => r.status(500).json(r.response.data.error_message))
  }
}