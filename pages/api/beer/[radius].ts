import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceData } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default function nearby(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PlaceData>[] | string>
) {

    console.log(req.query)

  if (req.query.radius && req.query.lat && req.query.lng) {
    // const location = [parseFloat(req.query.lat.toString()), parseFloat(req.query.lng.toString())]
    // const radius = parseFloat(req.query.radius.toString())     // add BUFFER
    // const keyword = 'beer'    // burgers, books
    // const opennow = true

    client.placesNearby({
      params: {
          location: [parseFloat(req.query.lat.toString()), parseFloat(req.query.lng.toString())],
          radius: parseFloat(req.query.radius.toString()),
          keyword: 'beer',
          opennow: true,
          key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
    })
    .then(r => res.status(200).json(r.data.results))
    .catch(e => res.status(500).json(e.response.data.error_message))
  }
}