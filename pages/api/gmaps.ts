// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

type Data = {
  name: string
}

export default function gmaps(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  client
    .placeAutocomplete({
      params: {
        input: 'Paris',
        key: process.env.GOOGLE_KEY!
      },
      timeout: 1000,
      })
      .then((r) => {
        console.log(r.data.predictions);
    })
    .catch((e) => {
      console.log(e);
    });

  // client
  //       .elevation({
  //           params: {
  //           locations: [{ lat: 45, lng: -110 }],
  //           key: process.env.GOOGLE_KEY!
  //           },
  //           timeout: 1000, // milliseconds
  //       })
  //       .then((r) => {
  //           console.log(r);
  //       })
  //       .catch((e) => {
  //           console.log(e);
  //       });

  // res.status(200).json({ name: 'John Doe' })
  return res
}