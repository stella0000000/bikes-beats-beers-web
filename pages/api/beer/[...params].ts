import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function nearby(
  req: NextApiRequest,
  res: NextApiResponse<any> // fix type
) {

    console.log(req.query.params)

    const location = [40.748440, 52.4407709]
    // const location = req.query.coords?.toString()
    const radius = 5000     // change + add BUFFER
    // const radius = req.query.radius ? parseInt(req.query.radius?.toString()) : undefined
    const keyword = 'beer'    // burgers, books
    const opennow = true

  if (location && radius) {
    client.placesNearby({
      params: {
          location: [52.4407709, 13.4445071],
          radius,
          keyword,
          opennow,
          key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })
    .then(r => res.status(200).json(r.data.results))
    .catch(e => res.status(500).json(e.response.data.error_message))
  }
}