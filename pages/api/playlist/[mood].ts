import type { NextApiRequest, NextApiResponse } from 'next'

export default async function playlist(
    req: NextApiRequest,
    res: NextApiResponse<>
    ) {
    const mood = req.query.mood
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=5`, {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
        }
      })
      console.log(response.json())
      res.status(200).json(response)
    } catch(err) {
      res.status(500).json('Uh oh - playlists failed')
      // res.status(500).json(response.data.error_message)
    }
}
