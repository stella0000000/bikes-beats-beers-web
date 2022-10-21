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

const Details = styled.div`
  width: 55vw;
  font-size: 15px;
  font-style: italic;
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
  destination, playlist, bikeRide, details, weather, modalOpen
}: ServerSideProps & JourneyProps) => {
  const views = useRef(null)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)

  const formatDay = (day: number) => {
    if (day === 0) {
      return 6
    } else {
      return day - 1
    }
  }
  
  const formatTime = (time: string) => {
    return `${closingTime.slice(0,2)}:${closingTime.slice(2)}`
  }

  const formatReview = (review: string) => {
    if (review.length > 300) {
      return `${review.slice(0, 300)}...`
    } else {
      return review
    }
  }

  const day = new Date().getDay()
  const closingTime = details.hours.periods[formatDay(day)].close.time

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
          estimated: {bikeRide.duration}<br></br><br></br>

          {parseInt(weather.temp)}°, {weather.description}
        </View>

        <View id={BUBBLES.BEATS}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Header>YOUR BEATS</Header>
          <Image src={`${playlist[3]}`} alt="playlist image" width={150} height={150} />
          <a href={`${playlist[1]}`} target="_blank" rel="noreferrer">{playlist[0]}</a>
          <Details>
            {playlist[2]}
          </Details>
        </View>

        <View id={BUBBLES.BEERS}>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Header>YOUR BEERS</Header>
          <a href={details.url} target="_blank" rel="noreferrer">{destination.name}</a>
          {destination.vicinity}<br></br>
          Open til {formatTime(closingTime)}<br></br>
          {("$").repeat(destination.price_level)} / ✰ {destination.rating} ✰<br></br><br></br>
          <Details>
            &laquo; {formatReview(details.review)} &raquo; - l&apos;étranger sur internet
          </Details>
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