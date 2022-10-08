import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function latLon(
  req: NextApiRequest,
  res: NextApiResponse<any> // fix type
) {
  const placeID = req.query.placeID?.toString();

  if (placeID) {
    try {
      const resp = await client.placeDetails({
        params: {
          // place_id: "ChIJw1IMd-j2wokR98jKplFZUKE",
          place_id: placeID,
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,        
      })
      res.status(200).json(resp.data.result.geometry?.location)
    } catch(error) {
      res.status(500).json(error)
      console.log(error)
    }
  }
}