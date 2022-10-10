import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import Predictions from '../components/predictions'

const Location = styled.input`
    width: 300px;
`

const Transit = styled.input`
    width: 100px;
`
const Search = () => {
    const [location, setLocation] = useState<string | undefined>(undefined)
    const [predictions, setPredictions] = useState<any | undefined>(undefined) // fix type
    const [startLocation, setStartLocation] = useState<string | undefined>(undefined)
    const [placeID, setPlaceID] = useState<string | undefined>(undefined)
    const [coords, setCoords] = useState<number[] | undefined>(undefined)
    const [transitTime, setTransitTime] = useState<number | undefined>(undefined)
    const [mood, setMood] = useState<number | undefined>(undefined)
    const [radius, setRadius] = useState<number | undefined>(50)

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            setPredictions(data)

            // FIX
            setMood(32) // kmh - fast
        }

        if (location) fetchPredictions();
    }, [location])

    useEffect(() => {
        const fetchCoordinates = async () => {
            const response = await fetch(`/api/coordinates/${placeID}`)
            const data = await response.json()
            setCoords([data.lat, data.lng])
            console.log({data})
        }

        if (placeID) fetchCoordinates()
    }, [placeID])

    useEffect(() => {
        const fetchBeer = async () => {
            const response = await fetch(`/api/beer/${radius}?lat=${coords ? coords[0] : null}&lng=${coords ? coords[1] : null}`)
            const data = await response.json()
            // setCoords(data)
            console.log({data})
        }

        if (coords) fetchBeer();
    }, [coords])

    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />
            <Location
                type="text"
                placeholder="Current location"
                onChange={debounce(e => setLocation(e.target.value), 500)}
                value={startLocation}
            />
            <Predictions
                predictions={predictions && Array.isArray(predictions) ? predictions : null}
                setPlaceID={setPlaceID}
                startLocation={setStartLocation}
                setPredictions={setPredictions}
            />
            Desired transit time
            <span>
                <Transit
                    type="number"
                    placeholder="00"
                    onKeyUp={e => setTransitTime(parseInt(e.currentTarget.value))}
                />
                minutes
            </span>
            <button onClick={() => {
                console.log(transitTime)
                // console.log(placeID)
                console.log(coords)
            }}>
                FIND BEATS AND BEERS
            </button>
        </main>
    )
}

export default Search

/**
 * Input current location
 * Display predictions
 * 
 * Click prediction - make start location => fetch lat/lon
 * Desired cycle time + mood (speed)
 * Interpolate distance
 * 
 * Search google maps: beer + radius
 * 0,5h * 32 kmh = 16 km radius from start loc, keyword="beer"
 * 
 * Swipe behavior
 * 
 * Suggest 1 location (random)
 * 
 * ERROR HANDLING
 */