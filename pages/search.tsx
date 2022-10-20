import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BikeSearch from '@components/search/bike'
import BeatSearch from '@components/search/beat'
import Modal from '@components/modal'
import BurgerMenu from '@components/burgerMenu'

enum DOT {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
  BEERS = 'BEERS'
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
    min-height: 71vh;
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
  padding-top: 70px;
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
  margin: 0px 0px 20px 0px;
  
  &:not(:last-child) {
    margin-right: 25px;
  }
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
  const [selectedBubble, setSelectedBubble] = useState<string>(DOT.BIKES)
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
      <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Container
        ref={views}
        modalOpen={modalOpen}
        onScroll={e => {
          const ele = e.target as HTMLInputElement
          if (ele.scrollLeft < ele.scrollWidth/2 - ele.scrollWidth/4) {
            setSelectedBubble(DOT.BIKES)
          } else {
            setSelectedBubble(DOT.BEATS)
          }
        }}
      >
        <View id={DOT.BIKES}>
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
        <View id={DOT.BEATS}>
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
          <Link href={`#${DOT.BIKES}`}>
            <Bubble selected={selectedBubble === DOT.BIKES}/>
          </Link>
          <Link href={`#${DOT.BEATS}`}>
            <Bubble selected={selectedBubble === DOT.BEATS} />
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
