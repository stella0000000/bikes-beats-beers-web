import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from '@styles/Home.module.css'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BikeSearch from '@components/bikeSearch'
import BeatSearch from '@components/beatSearch'
import Modal from '@components/modal'

enum Dot {
  BIKE = 'BIKE',
  BEATS = 'BEATS',
  BEERS = 'BEERS'
}

const MenuIcon = styled.div<{modalOpen?: boolean}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${props => props.modalOpen ? '10000' : '0'};
`

const Container = styled.div<{modalOpen?: boolean}>`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 65vh;
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

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

const Search = () => {
  const views = useRef(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [location, setLocation] = useState<string>('')
  const [predictions, setPredictions] = useState<any | undefined>(undefined) // fix type
  const [located, setLocated] = useState<boolean>(false)
  const [placeID, setPlaceID] = useState<string | undefined>(undefined)
  const [coords, setCoords] = useState<number[] | undefined>(undefined)
  const [transitTime, setTransitTime] = useState<number | undefined>(undefined)
  const [mood, setMood] = useState<string | undefined>(undefined)
  const [radius, setRadius] = useState<number | undefined>(undefined)
  const [destination, setDestination] = useState<string | undefined>(undefined)
  const [selectBubble, setSelectBubble] = useState<boolean>(true)
  const [playlist, setPlaylist] = useState<string | undefined>(undefined)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
      const fetchPredictions = async () => {
          const response = await fetch(`/api/predictions/${location}`)
          const data = await response.json()
          setPredictions(data)
      }

      if (location && !located) fetchPredictions();
  }, [location, located])

  useEffect(() => {
      const fetchCoordinates = async () => {
          const response = await fetch(`/api/coordinates/${placeID}`)
          const data = await response.json()
          setCoords([data.lat, data.lng])
      }

      if (placeID) fetchCoordinates()
  }, [placeID])

  useEffect(() => {
    setButtonDisabled(!location || !coords || !mood || !transitTime || !radius)
  }, [location, mood, coords, transitTime, radius])

  const fetchBeer = async () => {
      if (coords) {
          const response = await fetch(`/api/beer/${radius}?lat=${coords[0]}&lng=${coords[1]}`)
          const data = await response.json()
          setDestination(data[Math.floor(Math.random()*data.length)].name)
      }
  }

  const fetchPlaylist = async () => {
      const response = await fetch(`/api/playlist/${mood}`)
      const data = await response.json()
      console.log({ data })
      // setPlaylist(data)
  }

  // const updateLocation = (e: any )=> {
  //     setLocation(e?.target?.value)
  // }
  // const debouncedLocation = debounce(e => updateLocation(e), 200);

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
          setSelectBubble(ele.scrollLeft < ele.scrollWidth/2 - ele.scrollWidth/4)
        }}
      >
        <View>
          <BikeSearch
            setTransitTime={setTransitTime}
            predictions={predictions}
            setPredictions={setPredictions}
            setPlaceID={setPlaceID}
            located={located}
            setLocated={setLocated}
            location={location}
            setLocation={setLocation}
          />
        </View>
        <View>
          <BeatSearch
            mood={mood}
            setMood={setMood}
            transitTime={transitTime}
            setRadius={setRadius}
          />
        </View>
      </Container>
      <Button modalOpen={modalOpen}>
        <div>
          <Bubble selected={selectBubble} />
          <Bubble selected={!selectBubble} />
        </div>
        <Link
          href={
            {
              // pathname: '/journey',
              query: {
                destination: destination,
                playlist: 'some playlist when i fix the api call'
              }
            }}>
          <button
            onClick={() => {
              fetchBeer()
              console.log(destination)
              fetchPlaylist()
            }}
            disabled={buttonDisabled}
          >FIND BEATS AND BEERS
          </button>
        </Link>
      </Button>
    </>
  )
}

export default Search

/**
 * Click prediction - make start location => fetch lat/lon
 * Suggest 1 location (random)
 * map moods to playlist kewords => suggest 1 playlist

 * ERROR HANDLING
 * TYPES
 * display journey

 * button double click bug
 * data loader
 * make dots clickable to switch views
 */
