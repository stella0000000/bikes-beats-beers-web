import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import styles from '@styles/Home.module.css'

const About = styled.div`
  padding-top: 5px;
  font-size: 15px;
  text-align: center;

  @media only screen and (min-width: 750px) {
    font-size: 25px;
  }
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  -webkit-filter: invert(100%); /* Safari/Chrome */
  filter: invert(100%);
`
const Start = styled.button`
  margin-top: 200px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 40px;
  }
`

const Home: NextPage = () => {
  const [idx, setIdx] = useState(0)
  const images = [
    <Image key={0} src="/bike.png" alt="bike" width={210} height={110} />,
    <Image key={1} src="/beat.png" alt="bike" width={145} height={110} />,
    <Image key={2} src="/beer.png" alt="bike" width={125} height={110} />
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((idx + 1) % images.length)
    }, 500);
    return () => clearInterval(interval);
  }, [idx, images.length]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Icons>
          {images[idx]}
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
