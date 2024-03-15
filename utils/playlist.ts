/**
 *
 * @param mood
 * @returns keyword to fetch playlist
 */
const mapMoodToPlaylistKeyword = (mood: string | string[]) => {
  const relaxing = [
    "chill indie",
    "chill hip hop",
    "indie",
    "k-indie",
    "ethereal",
  ];
  const sweating = ["french hip hop", "techno", "kpop", "festive", "party"];
  const randoming = [
    "love",
    "boyfriend",
    "girlfriend",
    "paris",
    "justin bieber",
  ];

  if (mood === "RELAX") {
    return relaxing[Math.floor(Math.random() * relaxing.length)];
  } else if (mood === "SWEAT") {
    return sweating[Math.floor(Math.random() * sweating.length)];
  } else if (mood === `RANDOM`) {
    return randoming[Math.floor(Math.random() * randoming.length)];
  }
};

/**
 *
 * @param mood
 * @returns spotify playlist
 */
export const fetchPlaylist = async (mood: string | string[]) => {
  const keyword = mapMoodToPlaylistKeyword(mood);

  const getAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    const auth = await response.json();
    return auth.access_token;
  };

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${keyword}&type=playlist&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((r) => r.json());

    const data =
      response.playlists.items[
        Math.floor(Math.random() * response.playlists.items.length)
      ];

    const results = [
      data.name,
      data.external_urls.spotify,
      data.description,
      data.images[0].url,
    ];
    return results;
  } catch (err) {
    return console.log("fetch playlist", err);
  }
};
