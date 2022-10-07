// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceAutocompleteResult} from '@googlemaps/google-maps-services-js'

const client = new Client({})


export default function predictions(
  req: NextApiRequest,
  res: NextApiResponse<PlaceAutocompleteResult[]>
) {
  const location = req.query.toString();
  client
    .placeAutocomplete({
      params: {
        input: location,
        key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
      })
      .then((r) => {
        // console.log(r.data.predictions);
        return res.status(200).json(r.data.predictions)
    })
    .catch((e) => {
      res.status(500).json(e)
      res.end()
    });

  // res.status(200).json({ name: 'John Doe' })
  return res
}