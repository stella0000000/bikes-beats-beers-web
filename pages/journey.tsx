import Image from 'next/image'
import Link from 'next/link'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from '@components/modal'
import BurgerMenu from '@components/burgerMenu'

import { Client } from '@googlemaps/google-maps-services-js'
const client = new Client({})

enum BUBBLES {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
  BEERS = 'BEERS'
}

// fix type
type JourneyProps = {
  destination: any
  playlist: any
}

const Container = styled.div<{modalOpen?: boolean}>`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 65vh;
  filter: ${props => props.modalOpen ? 'blur(40px)' : 'none'};

  @media only screen and (min-width: 650px) {
    min-height: 75vh;
  }
`

const View = styled.div`
  min-width: 100vw;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  transform: none;
  width: 100%;
  left: 0;
  font-size: 30px;
  color: black;
  text-align: center;

  @media only screen and (min-width: 650px) {
    font-size: 20px;
  }
`

const Title = styled.div`
  font-size: 40px;
  padding-bottom: 20px;
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

  return (
    <>
      <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Container
        ref={views}
        modalOpen={modalOpen}
        onScroll={e => {
          const ele = e.target as HTMLInputElement
          if (ele.scrollLeft < ele.scrollWidth/3 - ele.scrollWidth/6) {
            setSelectedBubble(BUBBLES.BIKES)
          } else if (ele.scrollLeft > ele.scrollWidth/3) { // fix for center
            setSelectedBubble(BUBBLES.BEERS)
          } else {
            setSelectedBubble(BUBBLES.BEATS)
          }
        }}
      >
        <View id={BUBBLES.BIKES}>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          <Title>YOUR BIKE RIDE</Title>
          X kilometers<br></br>
          Y minutes<br></br>
          Grab a jacket, it&apos;s Z°
        </View>
        <View id={BUBBLES.BEATS}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Title>YOUR BEATS</Title>
          <Image src={`${props.playlist[3]}`} alt="playlist image" width={150} height={150} />
          <Link href={`${props.playlist[1]}`}>
            {props.playlist[0]}
          </Link>
          {props.playlist[2]}
        </View>
        <View id={BUBBLES.BEERS}>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Title>YOUR BEERS</Title>
          {props.destination[0].name}<br></br>
          {props.destination[0].vicinity}
        </View>
      </Container>

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
export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<JourneyProps>
> => {
  const { radius, coords, mood } = ctx.query

  if (!radius || !coords || !mood) {
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    }
  }

  // move to separate files
  const fetchBeer = async () => {
    try {
      const response = await client.placesNearby({
        params: {
            location: [parseFloat(coords[0].toString()), parseFloat(coords[1].toString())],
            radius: parseFloat(radius.toString()!), // metres
            keyword: 'bar',
            opennow: true,
            key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,
      })
      return response.data.results
    } catch(err) {
      return console.log('beer', err)
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

      const data = response.playlists.items[0]

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

  return {
    props: {
      destination,
      playlist
    }
  }

  // url shareable
}
