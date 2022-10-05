import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'

const Location = styled.input`
    width: 350px;
`

const Transit = styled.input`
    width: 100px;
`

const Search = () => {
    const [GMaps, setGMaps] = useState(null);

    useEffect(() => {
        const fetchGMaps = async () => {
            const response = await fetch('/api/gmaps')
            console.log(response)
        }
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