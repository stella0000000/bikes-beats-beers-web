import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

const Location = styled.input`
    width: 300px;
`

const Transit = styled.input`
    width: 100px;
`

const Search = () => {
    const [GMaps, setGMaps] = useState(null)
    
    const params = {
        input: 'paris',
        // sessionToken: '123',
        // offset: 2,
        // origin: undefined,
        // location: undefined,
        // radius: 2,
        // language: undefined,
        // types: undefined,
        // components: undefined,
        // strictBounds: false,
    }

    // client.placeAutocomplete('paris')
    
    console.log({params})
    
    useEffect(() => {
        const fetchGMaps = async () => {
            const response = await fetch('/api/gmaps')
            console.log(response)
        }
        fetchGMaps();
    }, [])

    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />
            <Location type="text" placeholder="Current location" />
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