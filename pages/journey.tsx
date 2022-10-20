import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Modal from '@components/modal'

import { Client } from '@googlemaps/google-maps-services-js'
const client = new Client({})

enum DOT {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
  BEERS = 'BEERS'
}

const MenuIcon = styled.div<{modalOpen?: boolean}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${props => props.modalOpen ? '10000' : '100'};
`

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

const Button = styled.div<{modalOpen?: boolean}>`
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

// fix type
const Journey = (props: any) => {
  const views = useRef(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectBubble, setSelectBubble] = useState<string>(DOT.BIKES)

  // fix - redirect to search if undeef.

  return (
    <>
      <MenuIcon modalOpen={modalOpen}>
        {modalOpen
           ? <Image src="/burgerClose.png" alt="bike" width={55} height={50} onClick={() => setModalOpen(false)}/>
          : <Image src="/burger.png" alt="bike" width={60} height={45} onClick={() => setModalOpen(true)}/>
        }
      </MenuIcon>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <Container
        ref={views}
        modalOpen={modalOpen}
        onScroll={e => {
          const ele = e.target as HTMLInputElement
          if (ele.scrollLeft < ele.scrollWidth/3 - ele.scrollWidth/6) {
            setSelectBubble(DOT.BIKES)
          } else if (ele.scrollLeft > ele.scrollWidth/3) { // fix for center
            setSelectBubble(DOT.BEERS)
          } else {
            setSelectBubble(DOT.BEATS)
          }
        }}
      >
        <View id={DOT.BIKES}>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          <Title>YOUR BIKE RIDE</Title>
          X kilometers<br></br>
          Y minutes<br></br>
          Grab a jacket, it&apos;s Z°
        </View>
        <View id={DOT.BEATS}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Title>YOUR BEATS</Title>
          <Image src={`${props.playlist[3]}`} alt="playlist image" width={150} height={150} />
          <Link href={`${props.playlist[1]}`}>
            {props.playlist[0]}
          </Link>
          {props.playlist[2]}
        </View>
        <View id={DOT.BEERS}>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Title>YOUR BEERS</Title>
          {props.destination[0].name}<br></br>
          {props.destination[0].vicinity}
        </View>
      </Container>

      <Button modalOpen={modalOpen}>
        <div>
          <Link href={`#${DOT.BIKES}`}>
            <Bubble selected={selectBubble === DOT.BIKES} />
          </Link>
          <Link href={`#${DOT.BEATS}`}>
            <Bubble selected={selectBubble === DOT.BEATS} />
          </Link>
          <Link href={`#${DOT.BEERS}`}>
            <Bubble selected={selectBubble === DOT.BEERS} />
          </Link>
        </div>
        <Link href='/search'>
          <button>↻ NEW JOURNEY</button>
        </Link>
      </Button>
    </>
  )
}

export default Journey

// fix type
export const getServerSideProps = async (ctx: any)=> {
  const { radius, coords, mood } = ctx.query

  // move to separate files
  const fetchBeer = async () => {
    try {
      const response = await client.placesNearby({
        params: {
            location: [parseFloat(coords[0].toString()), parseFloat(coords[1].toString())],
            radius: parseFloat(radius.toString()!),    // metres
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
