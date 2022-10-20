import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BikeSearch from '@components/bikeSearch'
import BeatSearch from '@components/beatSearch'
import Modal from '@components/modal'

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
    min-height: 65vh;
  }
`

const View = styled.div`
  min-width: 100vw;
  position: relative;
  scroll-snap-align: start;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
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
  // rename states .. locationValue, apiLocation.. etc
  // nest user input states into object
  // const [userData, setUserData] = useState<{}>({})
  // const setMood = (mood) => { setUserData(prevData => ({ ...prevData, mood })) }
  // for booleans => single state "state" => string "editing", "located"..

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
  const [loading, setLoading] = useState<boolean>(false)

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
    setButtonDisabled(
      !location ||
      !coords ||
      !mood ||
      !transitTime ||
      !radius ||
      loading
    )
  }, [location, mood, coords, transitTime, radius, loading])

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
        <View id={"bike"}>
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
        <View id={"beat"}>
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
          <Link href={'#bike'}>
            <Bubble selected={selectBubble} />
          </Link>
          <Link href={'#beat'}>
            <Bubble selected={!selectBubble} />
          </Link>
        </div>
        <Link
          href={
            {
              pathname: '/journey',
              query: {
                radius,
                coords,
                mood
              }
            }}>
          <button
            disabled={buttonDisabled}
            onClick={() => setLoading(true)}
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

 * ERROR HANDLING => think of the flow
 * TYPES
 * polish styling (mobile + web)
 * distance, time, weather

 * refactor components
 * useswr
 * map moods w/ genres? for better, randomized playlist

 * many usestates
 * on load - button shifting, etc bug
 */
