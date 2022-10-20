import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BurgerMenu from '@components/burgerMenu'
import Modal from '@components/modal'
import BikeSearch from '@components/search/bike'
import BeatSearch from '@components/search/beat'
import { Prediction } from '@components/search/predictions'

enum BUBBLES {
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
  const [locationInput, setLocationInput] = useState<string>('')
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(undefined)
  const [located, setLocated] = useState<boolean>(false)
  const [placeID, setPlaceID] = useState<string | undefined>(undefined)
  const [coords, setCoords] = useState<number[] | undefined>(undefined)
  const [transitTime, setTransitTime] = useState<number | undefined>(undefined)
  const [mood, setMood] = useState<string | undefined>(undefined)
  const [radius, setRadius] = useState<number | undefined>(undefined)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      const response = await fetch(`/api/predictions/${locationInput}`)
      const data = await response.json()
      setPredictions(data)
    }

    if (locationInput && !located) fetchPredictions();
  }, [locationInput, located])

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
      !locationInput ||
      !coords ||
      !mood ||
      !transitTime ||
      !radius
    )
  }, [locationInput, mood, coords, transitTime, radius])

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
            setSelectedBubble(BUBBLES.BIKES)
          } else {
            setSelectedBubble(BUBBLES.BEATS)
          }
        }}
      >
        <View id={BUBBLES.BIKES}>
          <BikeSearch
            setTransitTime={setTransitTime}
            predictions={predictions}
            setPredictions={setPredictions}
            setPlaceID={setPlaceID}
            located={located}
            setLocated={setLocated}
            locationInput={locationInput}
            setLocationInput={setLocationInput}
          />
        </View>
        <View id={BUBBLES.BEATS}>
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
          <Link href={`#${BUBBLES.BIKES}`}>
            <Bubble selected={selectedBubble === BUBBLES.BIKES}/>
          </Link>
          <Link href={`#${BUBBLES.BEATS}`}>
            <Bubble selected={selectedBubble === BUBBLES.BEATS} />
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
            onClick={() => setButtonDisabled(true)}
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
 * polish styling (mobile + web)
 * distance, time, weather

 * refactor components
 * useswr
 * map moods w/ genres? for better, randomized playlist

 * many usestates
 * on load - button shifting, etc bug
 */
