import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BurgerMenu from '@components/burgerMenu'
import Modal from '@components/modal'
import Screen from '@components/screen/screen'
import View from '@components/screen/view'
import BikeSearch from '@components/search/bike'
import BeatSearch from '@components/search/beat'
import { Prediction } from '@components/search/predictions'
import Bubble from '@components/bubble'

enum BUBBLES {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
}

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

const Search = () => {
  const views = useRef(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  // custom hook => can return context
  const [userData, setUserData] = useState<{
    locationInput?: string,
    placeID?: string,
    coords?: number[],
    transitTime?: number,
    mood?: string,
    radius?: number}>({})
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(undefined)
  const [located, setLocated] = useState<boolean>(false)
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      const response = await fetch(`/api/predictions/${userData.locationInput}`)
      const data = await response.json()
      setPredictions(data)
    }

    if (userData.locationInput && !located) fetchPredictions();
  }, [userData.locationInput, located])

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`/api/coordinates/${userData.placeID}`)
      const data = await response.json()

      setUserData(prevData => ({ ...prevData, coords: [data.coords.lat, data.coords.lng] }))
    }

    if (userData.placeID) fetchCoordinates()
  }, [userData.placeID])

  useEffect(() => {
    setButtonDisabled(
      !userData.locationInput ||
      !userData.coords ||
      !userData.mood ||
      !userData.transitTime ||
      !userData.radius
    )
  }, [userData.locationInput,
      userData.mood,
      userData.coords,
      userData.transitTime,
      userData.radius
  ])

  // const updateLocation = (e: any )=> {
  //     setLocation(e?.target?.value)
  // }
  // const debouncedLocation = debounce(e => updateLocation(e), 200);

  return (
    <>
      <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Screen
        views={views}
        modalOpen={modalOpen}
        setSelectedBubble={setSelectedBubble}
      >
        <View id={BUBBLES.BIKES}>
          <BikeSearch
            predictions={predictions}
            setPredictions={setPredictions}
            located={located}
            setLocated={setLocated}
            locationInput={userData.locationInput}
            setUserData={(key: string, data: string | number) =>
              setUserData(prevData => ({ ...prevData, [`${key}`]: data }))
            }
          />
        </View>
        <View id={BUBBLES.BEATS}>
          <BeatSearch
            mood={userData.mood}
            transitTime={userData.transitTime}
            setUserData={(key: string, data?: string | number) =>
              setUserData(prevData => ({ ...prevData, [`${key}`]: data }))
            }
          />
        </View>
      </Screen>
      <Buttons modalOpen={modalOpen}>
        <div>
          <Bubble bubble={BUBBLES.BIKES} selected={selectedBubble === BUBBLES.BIKES}/>
          <Bubble bubble={BUBBLES.BEATS}  selected={selectedBubble === BUBBLES.BEATS} />
        </div>
        <Link
          href={
            { pathname: '/journey',
              query: {
                radius: userData.radius,
                lat: userData.coords?.[0],
                lng: userData.coords?.[1],
                mood: userData.mood,
                transitTime: userData.transitTime,
              }
            }
          }>
          <button
            disabled={buttonDisabled}
            onClick={() => setButtonDisabled(true)}
          >FIND BEATS AND BEERS
          </button>
        </Link>
      </Buttons>
    </>
  )
}

export default Search

/**
 * polish styling (mobile + web)
 * debounce
 * journey loading

 * useswr
 * userData custom hook
 * refactor components
 * ERROR HANDLING => think of the flow
 * landing page animation - types

 * adjust speeds
 * map moods for playlist keywords
 */
