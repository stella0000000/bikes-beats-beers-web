import Link from 'next/link'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult } from 'next'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { BREW, BUBBLES } from '@utils/constants'
import {
  fetchBrew,
  fetchBikeRide,
  fetchDetails } from '@utils/map'
import { fetchPlaylist } from '@utils/playlist'
import { fetchWeather } from '@utils/weather'
import { Bubble } from '@components/bubble'
import { Nav } from '@components/screen/nav'
import { Screen } from '@components/screen/screen'
import { View } from '@components/screen/view'
import { BeatResult } from '@components/results/beat'
import { BrewResult } from '@components/results/brew'
import { BikeResult } from '@components/results/bike'

const NewJourneyButton = styled.button<{brew?: string}>`
  cursor: default;
  background: ${props => props.brew === BREW.COFFEE ? '#C9C6BD' : 'black'};
  color: ${props => props.brew === BREW.COFFEE ? 'black' : '#ffa0d7'};
  border: 2px solid #b4b4b4;
`

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
        <View id={BUBBLES.BREWS}>
          <BrewResult destination={destination} details={details} />
        </View>
      </Screen>

      <Nav modalOpen={modalOpen}>
        <div>
          <Bubble bubble={BUBBLES.BIKES} selected={selectedBubble === BUBBLES.BIKES}/>
          <Bubble bubble={BUBBLES.BEATS} selected={selectedBubble === BUBBLES.BEATS} />
          <Bubble bubble={BUBBLES.BREWS} selected={selectedBubble === BUBBLES.BREWS}/>
        </div>
        <Link href='/search'>
          <NewJourneyButton>↻ NEW JOURNEY</NewJourneyButton>
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
  let { radius, lat, lng, mood, brew } = ctx.query

  if (!radius || !lat || !lng || !mood ) {
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    }
  }

  const [destination, playlist] = await Promise.all([fetchBrew(brew, lat, lng, radius), fetchPlaylist(mood)])
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