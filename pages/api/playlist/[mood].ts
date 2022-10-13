import type { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-js'


export default async function playlist(
    req: NextApiRequest,
    res: NextApiResponse<SpotifyApi.PlaylistSearchResponse | string>
    ) {
    console.log(req.query.mood)

    const spotify = new SpotifyWebApi()
    const accessToken = await spotify.getAccessToken();
    console.log(accessToken)
    
    console.log(spotify.getAccessToken())

    // console.log(spotify)

    try {
      const response = await spotify.searchPlaylists(
        'party'
      )
      console.log(response.playlists)
    //   res.status(200).json(response)
    } catch(err) {
      res.status(500).json('Uh oh - playlists failed')
      // res.status(500).json(response.data.error_message)
    }
}