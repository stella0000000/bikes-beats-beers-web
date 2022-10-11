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
    const [located, setLocated] = useState<boolean>(false)
    const [placeID, setPlaceID] = useState<string | undefined>(undefined)
    const [coords, setCoords] = useState<number[] | undefined>()
    const [transitTime, setTransitTime] = useState<number | undefined>()
    const [mood, setMood] = useState<number | undefined>(undefined)
    const [radius, setRadius] = useState<number | undefined>(undefined)

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            setPredictions(data)
        }

        if (location && !located) fetchPredictions();
    }, [location])

    useEffect(() => {
        const fetchCoordinates = async () => {
            const response = await fetch(`/api/coordinates/${placeID}`)
            const data = await response.json()
            setCoords([data.lat, data.lng])
        }

        if (placeID) fetchCoordinates()
    }, [placeID])

    useEffect(() => {
        const interpolateRadius = () => {
            if (mood && transitTime) {
                // mood kmh - transitTime min - radius meter
                setRadius(mood * transitTime / 60 * 1000) // convert
            }
        }

        interpolateRadius()
    }, [mood])

    const fetchBeer = async () => {
        if (coords) {
            const response = await fetch(`/api/beer/${radius}?lat=${coords[0]}&lng=${coords[1]}`)
            const data = await response.json()
            console.log({data})
        }
    }

    const randomMood = (min: number, max: number) => {
        return Math.random() * (max - min) + min
    }

    // const updateLocation = (e: any )=> {
    //     setLocation(e?.target?.value)
    // }
    // const debouncedLocation = debounce(e => updateLocation(e), 200);

    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={165} height={95} />
            <Location
                type="text"
                placeholder="Current location"
                onChange={e => {
                    setLocation(e.target.value)
                    setLocated(false)
                    e.target.value==='' ? setPredictions(undefined) : null
                }}
                value={location}
            />
            <Predictions
                predictions={predictions && Array.isArray(predictions) ? predictions : null}
                setPlaceID={setPlaceID}
                setLocated={setLocated}
                setLocation={setLocation}
                setPredictions={setPredictions}
                located={located}
            />
            Desired transit time
            <span>
                <Transit
                    type="number"
                    placeholder="00"
                    onChange={e => setTransitTime(parseInt(e.target.value))}
                /> minutes
            </span>

            <Image src="/beat.png" alt="bike" width={110} height={120} />
            <div>
                {/* fix default to no mood selected */}
                <input type="radio" name="mood" onClick={() => setMood(32)} /> SWEAT<br></br>
                <input type="radio" name="mood" onClick={() => setMood(17)} /> CHILL<br></br>
                <input type="radio" name="mood" onClick={() => setMood(randomMood(15, 35))} /> WHATEVER
            </div>

            <button
                onClick={() => {
                    fetchBeer()
                    // console.log(transitTime)
                    // console.log(mood)
                    // console.log(placeID)
                    // console.log(coords)
                }}
                disabled={!coords || !mood || !transitTime || !radius}
            >
                FIND BEATS AND BEERS
            </button>
        </main>
    )
}

export default Search

/**
 * Input current location
 * Display predictions
 * Click prediction - make start location => fetch lat/lon
 * Desired cycle time + mood (speed)
 * Interpolate distance
 * Search google maps: beer + radius
 * 0,5h * 32 kmh = 16 km radius from start loc, keyword="beer"
 * 
 * Swipe behavior
 * 
 * Suggest 1 location (random)
 * 
 * ERROR HANDLING
 */