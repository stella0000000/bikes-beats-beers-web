import type { NextApiRequest, NextApiResponse } from 'next'

export default async function playlist(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const mood = req.query.mood

    const getAccessToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        body: new URLSearchParams({
          grant_type: "client_credentials"
        }),
      })

      const auth = await response.json()
      return auth.access_token
    };

    try {
      const accessToken = await getAccessToken()

      const response = await fetch(`https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=5`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(r => r.json())
      console.log(response.playlists.items)
      res.status(200).json(response.playlists.items)
    } catch(err) {
      res.status(500).json('Uh oh - playlists failed')
      // res.status(500).json(response.data.error_message)
    }
}
