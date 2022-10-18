import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Modal from '@components/modal'

import { Client, PlaceData } from '@googlemaps/google-maps-services-js'

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
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 65vh;
  filter: ${props => props.modalOpen ? 'blur(40px)' : 'none'};

  @media only screen and (min-width: 650px) {
    min-height: 65vh;
  }
`

const View = styled.div`
  min-width: 100vw;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  transform: none;
  width: 100%;
  left: 0;
  font-size: 30px;
  color: black;

  @media only screen and (min-width: 650px) {
    font-size: 20px;
  }
`

const Title = styled.div`
  font-size: 40px;
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
  margin: 30px 12px 25px 12px;
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
        <View>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          <Title>YOUR BIKE RIDE</Title>
          distance, time, wx
        </View>
        <View>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Title>YOUR BEATS</Title>
          {props.playlist}
        </View>
        <View>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          <Title>YOUR BEERS</Title>
          {props.destination[0].name}<br></br>
          {props.destination[0].vicinity}
        </View>
      </Container>

      <Button modalOpen={modalOpen}>
        <div>
          <Bubble selected={selectBubble === DOT.BIKES} />
          <Bubble selected={selectBubble === DOT.BEATS} />
          <Bubble selected={selectBubble === DOT.BEERS} />
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
      console.log(response.playlists.items)
      return response.playlists.items[0].external_urls.spotify // fix
    } catch(err) {
      return console.log('fetch playlist', err)
    }
  }

  // 2 awaits
  const destination = await fetchBeer()
  const playlist = await fetchPlaylist()

  // const [destination, playlist] = (await Promise.allSettled([fetchBeer(), fetchPlaylist()])).map(result => (
  //   result.value
  // ))
  // or Promise.all - test - doesn't allow breaking

  // console.log(destination)
  console.log(playlist)

  return {
    props: {
      destination,
      playlist
    }
  }

  // url shareable
}
