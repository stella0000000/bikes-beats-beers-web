import Image from 'next/image'
import Link from 'next/link'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import BurgerMenu from '@components/burgerMenu'
import Modal from '@components/modal'
import Screen from '@components/screen/screen'
import View from '@components/screen/view'

import { Client, PlaceData, TravelMode, TravelRestriction, UnitSystem } from '@googlemaps/google-maps-services-js'
const client = new Client({})

enum BUBBLES {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
  BEERS = 'BEERS',
}

// fix type
type JourneyProps = {
  destination: any
  playlist: any
  transitTime: any
  bikeRide: any
  details: any
}

const Header = styled.div`
  font-size: 40px;
  padding-bottom: 20px;
`

const Review = styled.div`
  width: 75vw;
  font-size: 15px;
  font-style: italic;
`

const Buttons = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

  @media only screen and (min-width: 650px) {
    font-size: 40px;
  }
`

const Bubble = styled.span<{selected?: boolean}>`
  height: 27px;
  width: 27px;
  border: 2px solid #BDFF00;
  background-color: ${props => props.selected ? '#BDFF00' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin: 0px 0px 20px 0px;
  
  &:not(:last-child) {
    margin-right: 25px;
  }
`

const Journey = (props: JourneyProps) => {
  const views = useRef(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)

  console.log(props.details.hours)

  return (
    <>
      <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Screen
        views={views}
        modalOpen={modalOpen}
        setSelectedBubble={setSelectedBubble}
      >
        <View id={BUBBLES.BIKES}>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          <Header>YOUR BIKE RIDE</Header>
          distance: {props.bikeRide.distance}<br></br>
          estimated: {props.bikeRide.duration}<br></br>
          desired: {props.transitTime} mins
        </View>
        <View id={BUBBLES.BEATS}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Header>YOUR BEATS</Header>
          <Image src={`${props.playlist[3]}`} alt="playlist image" width={150} height={150} />
          <Link href={`${props.playlist[1]}`}>
            {props.playlist[0]}
          </Link>
          {props.playlist[2]}
        </View>
        <View id={BUBBLES.BEERS}>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Header>YOUR BEERS</Header>
          {props.destination.name}<br></br>
          {props.destination.vicinity}<br></br>
          {("$").repeat(props.destination.price_level)}<br></br><br></br>
          ✰ {props.destination.rating} ✰<br></br>
          <Review>{props.details.review}</Review><br></br>
          {/* Closes at: {props.details.hours}<br></br> */}
        </View>
      </Screen>

      <Buttons modalOpen={modalOpen}>
        <div>
          <Link href={`#${BUBBLES.BIKES}`}>
            <Bubble selected={selectedBubble === BUBBLES.BIKES} />
          </Link>
          <Link href={`#${BUBBLES.BEATS}`}>
            <Bubble selected={selectedBubble === BUBBLES.BEATS} />
          </Link>
          <Link href={`#${BUBBLES.BEERS}`}>
            <Bubble selected={selectedBubble === BUBBLES.BEERS} />
          </Link>
        </div>
        <Link href='/search'>
          <button>↻ NEW JOURNEY</button>
        </Link>
      </Buttons>
    </>
  )
}

export default Journey

// fix type - async return
export const getServerSideProps = async (ctx: GetServerSidePropsContext):
  Promise<GetServerSidePropsResult<JourneyProps>
> => {
  const { radius, lat, lng, mood, transitTime } = ctx.query

  if (!radius || !lat || !lng || !mood || !transitTime) {
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    }
  }

  // move to separate files
  const fetchBeer = async (): Promise<Partial<PlaceData> | string> => {
    try {
      const response = await client.placesNearby({
        params: {
            location: [parseFloat(lat.toString()), parseFloat(lng.toString())],
            radius: parseFloat(radius.toString()!), // metres
            keyword: 'bar',
            opennow: true,
            key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,
      })

      return response.data.results[Math.floor(Math.random()*response.data.results.length)]
    } catch(err) {
      return `beer, ${err}`
    }
  }

  const fetchPlaylist = async () => {
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

      const data = response.playlists.items[Math.floor(Math.random()*response.playlists.items.length)]

      const results = [
        data.name,
        data.external_urls.spotify,
        data.description,
        data.images[0].url
        ]
      return results
    } catch(err) {
      return console.log('fetch playlist', err)
    }
  }

  const [destination, playlist] = await Promise.all([fetchBeer(), fetchPlaylist()])

  const fetchBikeRide = async () => {
    try {
      if (typeof destination !== 'string') {
        const distance = await client.distancematrix({
          params: {
            origins: [[parseFloat(lat.toString()), parseFloat(lng.toString())]],
            destinations: [destination.vicinity!],
            mode: TravelMode.bicycling,
            avoid: [TravelRestriction.tolls, TravelRestriction.highways, TravelRestriction.ferries],
            units: UnitSystem.metric,
            key: process.env.GOOGLE_KEY!
          },
          timeout: 1000
        })
        // console.log(distance.data.rows[0].elements[0].distance)
        // console.log(distance.data.rows[0].elements[0].duration)
        return {
          distance: distance.data.rows[0].elements[0].distance.text,
          duration: distance.data.rows[0].elements[0].duration.text
        }
        // return distance
      }
    } catch(err) {
      return console.log('distance', err)
    }
  }

  const bikeRide = await fetchBikeRide()

  const fetchDetails = async () => {
    if (typeof destination !== 'string') {
      try {
        const response = await client.placeDetails({
          params: {
            place_id: destination.place_id!,
            key: process.env.GOOGLE_KEY!
          },
          timeout: 1000,
        })

        return {
          hours: response.data.result.opening_hours,
          url: response.data.result.url,
          review: response.data.result.reviews![Math.floor(Math.random()*response.data.result.reviews!.length)].text
        }
      } catch(err) {
        return console.log('details', err)
      }
    }
  }

  const details = await fetchDetails()

  console.log(details)

  const fetchWeather = async () => {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  }

  return {
    props: {
      destination,
      playlist,
      transitTime,
      bikeRide,
      details
    }
  }
}
