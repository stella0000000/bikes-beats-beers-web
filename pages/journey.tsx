import Image from 'next/image'
import Link from 'next/link'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import Screen from '@components/screen/screen'
import View from '@components/screen/view'
import Bubble from '@components/bubble'
import Nav from '@components/nav'
import { BUBBLES, fetchBeer, fetchBikeRide, fetchDetails, fetchPlaylist, fetchWeather } from 'utils'

const Header = styled.div`
  font-size: 40px;
  padding-bottom: 20px;
`

const Review = styled.div`
  width: 75vw;
  font-size: 15px;
  font-style: italic;
`

// fix type
type ServerSideProps = {
  destination: any
  playlist: any
  transitTime: string | string[]
  bikeRide: any
  details: any
  weather: any
}

type JourneyProps = {
  modalOpen: boolean
}

const Journey = ({
  destination, playlist, transitTime, bikeRide, details, weather, modalOpen
}: ServerSideProps & JourneyProps) => {
  const views = useRef(null)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)

  console.log(details.hours)

  return (
    <>
      <Screen
        views={views}
        modalOpen={modalOpen}
        setSelectedBubble={setSelectedBubble}
      >
        <View id={BUBBLES.BIKES}>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          <Header>YOUR BIKE RIDE</Header>
          distance: {bikeRide.distance}<br></br>
          estimated: {bikeRide.duration}<br></br>
          desired: {transitTime} mins<br></br><br></br>

          {parseInt(weather.temp)}°, {weather.description}
        </View>

        <View id={BUBBLES.BEATS}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Header>YOUR BEATS</Header>
          <Image src={`${playlist[3]}`} alt="playlist image" width={150} height={150} />
          <a href={`${playlist[1]}`} target="_blank" rel="noreferrer">{playlist[0]}</a>
          {playlist[2]}
        </View>

        <View id={BUBBLES.BEERS}>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Header>YOUR BEERS</Header>
          <a href={details.url} target="_blank" rel="noreferrer">{destination.name}</a>
          {destination.vicinity}<br></br>
          {("$").repeat(destination.price_level)}<br></br><br></br>
          ✰ {destination.rating} ✰<br></br>
          <Review>{details.review}</Review><br></br>
          {/* Closes at: {details.hours}<br></br> */}
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

// fix type - async return
export const getServerSideProps = async (ctx: GetServerSidePropsContext):
  Promise<GetServerSidePropsResult<ServerSideProps>
> => {
  let { radius, lat, lng, mood, transitTime } = ctx.query

  if (!radius || !lat || !lng || !mood || !transitTime) {
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
      transitTime,
      bikeRide,
      details,
      weather
    }
  }
}