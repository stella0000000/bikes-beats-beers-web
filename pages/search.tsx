import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
// import { debounce } from 'lodash.debounce'

const Location = styled.input`
    width: 300px;
`

const Transit = styled.input`
    width: 100px;
`

const Search = () => {
    const [location, setLocation] = useState<string | undefined>(undefined)
    const [predictions, setPredictions] = useState<any | undefined>(undefined) // fix type

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            
            setPredictions(data)

            console.log(data)
        }

        fetchPredictions();


    }, [location])

    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />
            <Location type="text" placeholder="Current location" onChange={e => setLocation(e.currentTarget.value)} />
            Desired transit time
            <span><Transit type="value" placeholder="00" /> mins</span>
            <button>FIND BEATS AND BEERS</button>
        </main>
    )
}

export default Search

/**
 * Input current location
 * Desired cycle time + mood (speed) => interpolate distance
 * Search google maps: beer + radius
 * Suggest 1 location (filter 3+ stars, choose randomly)
 */