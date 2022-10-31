import Link from 'next/link'
import { useState, useEffect, useRef, useContext } from 'react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import { Screen } from '@components/screen/screen'
import { View } from '@components/screen/view'
import { Bubble } from '@components/bubble'
import { Nav } from '@components/screen/nav'
import { BikeSearch } from '@components/search/bike'
import { Prediction } from '@components/predictions/predictions'
import { BeatSearch } from '@components/search/beat'
import { BUBBLES } from '@utils/constants'
import { Ctx } from '@utils/context'

const SearchWrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
`
type Props = {
  modalOpen: boolean
}

const Search = ({ modalOpen }: Props) => {
  const brew = useContext(Ctx)
  const views = useRef(null)
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
      setUserData(prevData => ({ ...prevData, coords: [data.lat, data.lng] }))
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
    <SearchWrapper>
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
      <Nav modalOpen={modalOpen}>
        <div>
          <Bubble bubble={BUBBLES.BIKES} selected={selectedBubble === BUBBLES.BIKES}/>
          <Bubble bubble={BUBBLES.BEATS} selected={selectedBubble === BUBBLES.BEATS} />
        </div>
        <Link
          href={
            { pathname: '/journey',
              query: {
                brew: brew,
                radius: userData.radius,
                lat: userData.coords?.[0],
                lng: userData.coords?.[1],
                mood: userData.mood,
              }
            }
          }>
          <button
            disabled={buttonDisabled}
            onClick={() => setButtonDisabled(true)}
          >MY BEATS AND BREWS
          </button>
        </Link>
      </Nav>
    </SearchWrapper>
  )
}

export default Search

/**
 * ERROR HANDLING
 * check types
 * 
 * debounce
 * userData custom hook
 * 
 */

// can't find bike routes
// how about a car route --> like bali, no designated bike lanes