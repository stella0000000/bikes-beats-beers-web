import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'

const Location = styled.input`
    border: 2px solid #BDFF00;
    border-radius: 100px;
    background: transparent;
    padding: 7px 10px;
    font-size: 17px;
    width: 350px;
    font-style: italic;
    text-align: center;
`

const Transit = styled.input`
    border: 2px solid #BDFF00;
    border-radius: 100px;
    background: transparent;
    padding: 5px 10px;
    font-size: 17px;
    width: 100px;
    font-style: italic;
    text-align: center;
`

// const Find = styled.button`
//     font-size: 17px;
//     background: #FF0099;
//     border: none;
//     border-radius: 100px;
//     padding: 10px;
// `

const Bike = () => {
    return (
        <main className={styles.main}>
            <Image src="/bike.png" alt="bike" width={175} height={100} />
            <Location type="text" placeholder="Current location" />
            Desired transit time
            <span><Transit type="value" placeholder="00" /> mins</span>
            {/* <Find>FIND BEATS AND BEERS</Find> */}
        </main>
    )
}

export default Bike