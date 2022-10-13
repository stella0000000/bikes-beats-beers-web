import type { NextApiRequest, NextApiResponse } from 'next'

export default async function playlist(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const mood = req.query.mood

    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: {
    //     'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
    //   json: true
    // };
    //
    // const resp = await fetch(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    //     var token = body.access_token;
    //     console.log(token)
    //   }

    // try {
    //   const response = await fetch(`https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=5`, {
    //     headers: {
    //       Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
    //     }
    //   }).then(r => r.json())
    //   console.log(response)
    //   // res.status(200).json(response)
    // } catch(err) {
    //   res.status(500).json('Uh oh - playlists failed')
    //   // res.status(500).json(response.data.error_message)
    // }
}
