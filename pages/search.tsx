import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    const [coords, setCoords] = useState<any>(undefined)
    const [transitTime, setTransitTime] = useState<number | undefined>(undefined)
    const [mood, setMood] = useState<number | undefined>(undefined)

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            setPredictions(data)

            // TEST
            setMood(32) // kmh - fast
        }

        const fetchCoordinates = async () => {
            const response = await fetch(`/api/coordinates/${placeID}`)
            const data = await response.json()
            // setCoords(data)
            console.log(data)
        }

        if (location) fetchPredictions();

        // fetchCoordinates()
    }, [location])

    return (
        <main className={styles.main}>
            <Image
                src="/bike.png"
                alt="bike"
                width={175}
                height={100}
            />
            <Location
                type="text"
                placeholder="Current location"
                onChange={debounce(e => setLocation(e.target.value), 500)}
                value={startLocation}
            />
            <Predictions
                predictions={predictions}
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
            <button onClick={() => console.log(transitTime)}>
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
 * Suggest 1 location (filter 3+ stars, choose randomly)
 */