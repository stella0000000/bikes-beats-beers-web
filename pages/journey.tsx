import Link from 'next/link'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult } from 'next'
import { useRef, useState } from 'react'
import { BUBBLES } from '@utils/constants'
import {
  fetchBeer,
  fetchBikeRide,
  fetchDetails } from '@utils/map'
import { fetchPlaylist } from '@utils/playlist'
import { fetchWeather } from '@utils/weather'
import Bubble from '@components/bubble'
import BeatResult from '@components/results/beat'
import BeerResult from '@components/results/beer'
import BikeResult from '@components/results/bike'
import Nav from '@components/screen/nav'
import Screen from '@components/screen/screen'
import View from '@components/screen/view'

// fix type
type ServerSideProps = {
  destination: any
  playlist: any
  bikeRide: any
  details: any
  weather: any
}

type JourneyProps = {
  modalOpen: boolean
}

const Journey = ({
  destination,
  playlist,
  bikeRide,
  details,
  weather,
  modalOpen
}: ServerSideProps & JourneyProps) => {
  const views = useRef(null)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)

  return (
    <>
      <Screen
        views={views}
        modalOpen={modalOpen}
        setSelectedBubble={setSelectedBubble}
      >
        <View id={BUBBLES.BIKES}>
          <BikeResult bikeRide={bikeRide} weather={weather} />
        </View>
        <View id={BUBBLES.BEATS}>
          <BeatResult playlist={playlist} />
        </View>
        <View id={BUBBLES.BEERS}>
          <BeerResult destination={destination} details={details} />
        </View>
      </Screen>

      <Nav modalOpen={modalOpen}>
        <div>
          <Bubble bubble={BUBBLES.BIKES} selected={selectedBubble === BUBBLES.BIKES}/>
          <Bubble bubble={BUBBLES.BEATS} selected={selectedBubble === BUBBLES.BEATS} />
          <Bubble bubble={BUBBLES.BEERS} selected={selectedBubble === BUBBLES.BEERS}/>
        </div>
        <Link href='/search'>
          <button>↻ NEW JOURNEY</button>
        </Link>
      </Nav>
    </>
  )
}

export default Journey

// fix type
export const getServerSideProps = async (ctx: GetServerSidePropsContext):
  Promise<GetServerSidePropsResult<ServerSideProps>
> => {
  let { radius, lat, lng, mood } = ctx.query

  if (!radius || !lat || !lng || !mood ) {
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    }
  }

  const [destination, playlist] = await Promise.all([fetchBeer(lat, lng, radius), fetchPlaylist(mood)])
  const bikeRide = await fetchBikeRide(destination, lat, lng)
  const details = await fetchDetails(destination)
  const weather = await fetchWeather(lat, lng)

  return {
    props: {
      destination,
      playlist,
      bikeRide,
      details,
      weather
    }
  }
}