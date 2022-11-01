import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceData } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function brews(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PlaceData>[] | string>
) {
  try {
    const response = await client.placesNearby({
      params: {
          location: [parseFloat(req.query.lat?.toString()!), parseFloat(req.query.lng?.toString()!)],
          radius: parseFloat(req.query.radius?.toString()!),    // metres
          keyword: 'bar',
          opennow: true,
          key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })
    res.status(200).json(response.data.results)
  } catch(err) {
    res.status(500).json('Uh oh - brews failed')
    // res.status(500).json(response.data.error_message)
  }
}

//move to separate simple js file without res.status etc just await client.placesnearby
