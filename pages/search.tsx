import React, { useState, useEffect, useCallback } from 'react'
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
    const [location, setLocation] = useState<string>('')
    const [predictions, setPredictions] = useState<any | undefined>(undefined) // fix type
    // const [startLocation, setStartLocation] = useState<string | undefined>(undefined)
    const [locationSelected, setLocationSelected] = useState<boolean>(false)
    const [placeID, setPlaceID] = useState<string | undefined>(undefined)
    const [coords, setCoords] = useState<number[] | undefined>()
    const [transitTime, setTransitTime] = useState<number | undefined>()
    const [mood, setMood] = useState<number | undefined>(undefined)
    const [radius, setRadius] = useState<number | undefined>(5000)

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            setPredictions(data)

            // FIX
            setMood(32) // kmh - fast
        }

        if (location) fetchPredictions(), 800;
    }, [location])

    useEffect(() => {
        const fetchCoordinates = async () => {
            const response = await fetch(`/api/coordinates/${placeID}`)
            const data = await response.json()
            setCoords([data.lat, data.lng])
            // console.log({data})
        }

        if (placeID) fetchCoordinates()
    }, [placeID])

    useEffect(() => {
        const fetchBeer = async () => {
            if (coords) {
                const response = await fetch(`/api/beer/${radius}?lat=${coords[0]}&lng=${coords[1]}`)
                const data = await response.json()
                console.log({data})
            }
        }

        if (coords) fetchBeer();
    }, [coords])

    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />
            <Location
                type="text"
                placeholder="Current location"
                onChange={e => setLocation(e.target.value)}
                value={location}
            />
            <Predictions
                predictions={predictions && Array.isArray(predictions) ? predictions : null}
                setPlaceID={setPlaceID}
                // startLocation={setStartLocation}
                setLocation={setLocation}
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