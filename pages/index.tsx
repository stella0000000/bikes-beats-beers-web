// import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import styled from 'styled-components'

const About = styled.div`
  padding-top: 5px;
  font-size: 17px;
  text-align: center;

  @media only screen and (min-width: 750px) {
    font-size: 25px;
  }
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
`
const Start = styled.button`
  font-size: 20px;
  margin-top: 175px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 45px;
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
      <main className={styles.main}>
        <Icons>
          <Image src="/bike.png" alt="bike" width={160} height={90} />
          <Image src="/beat.png" alt="beat" width={120} height={90} />
          <Image src="/beer.png" alt="beer" width={100} height={90} />
        </Icons>
        <About>
          ✿.｡ discover your neighborhood ｡.✿
        </About>
        <Link href="/search">
          <Start>START YOUR JOURNEY</Start>
        </Link>
      </main>
    </div>
  )
}

export default Home
