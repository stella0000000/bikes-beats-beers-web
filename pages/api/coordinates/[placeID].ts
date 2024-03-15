import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export default async function coordinates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const place_id = req.query.placeID?.toString();

  if (place_id) {
    try {
      const response = await client.placeDetails({
        params: {
          place_id,
          key: process.env.GOOGLE_KEY!,
        },
        timeout: 1000,
      });
      res.status(200).json(response.data.result.geometry?.location);
    } catch (err: any) {
      res.status(500).json("Error retrieving coordinates.");
    }
  }
}
