// import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import styled from 'styled-components'

const About = styled.div`
  padding-top: 20px;
  font-size: 25px;
  font-style: italic;
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Start = styled.button`
  font-size: 20px;
  margin-top: 120px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 50px;
  }
`

// function useInterval(callback: () => void, delay: number) {
//   const savedCallback = useRef();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

const Home: NextPage = () => {
  // const images = [
  //   <Image src="/bike.png" alt="bike" width={230} height={130} />,
  //   <Image src="/beat.png" alt="bike" width={170} height={130} />,
  //   <Image src="/beer.png" alt="bike" width={155} height={130} />
  // ]
  // const [idx, setIdx] = useState(0)

  // useInterval(() => {
  //       setIdx((idx + 1) % images.length);
  //   }, 300);

  return (
    <div className={styles.container}>
      <Head>
        <title>bikes, beats, and beers</title>
        <meta name="description" content="bike to beers while listening to beats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Icons>
          <Image src="/bike.png" alt="bike" width={200} height={110} />
          <Image src="/beat.png" alt="bike" width={140} height={110} />
          <Image src="/beer.png" alt="bike" width={140} height={120} />
        </Icons>
        <About>
          Explore your neighborhood.
        </About>
        <Link href="/search">
          <Start>START YOUR JOURNEY</Start>
        </Link>
      </main>
    </div>
  )
}

export default Home
