import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import styles from '@styles/Home.module.css'
import { BREW } from '@utils/constants'
import { BrewContext } from '@utils/context';

const Wrapper = styled.div<{brew?: string}>`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const About = styled.div`
  padding-top: 5px;
  font-size: 15px;
  text-align: center;

  @media only screen and (min-width: 750px) {
    font-size: 25px;
  }
`

const Icons = styled.div<{brew?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  -webkit-filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
  filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
`

const Start = styled.button`
  margin-top: 200px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 40px;
  }
`

const Home: NextPage = () => {
  const brew = useContext(BrewContext)
  const [idx, setIdx] = useState(0)
  const bike = <Image key={0} src="/bike.png" alt="bike" width={210} height={110} />
  const beat = <Image key={1} src="/beat.png" alt="beat" width={145} height={110} />
  const beverage = <Image
                      key={1}
                      src={`/${brew?.toLowerCase()}.png`}
                      alt="brew"
                      width={brew === BREW.BEER ? 125 : 110}
                      height={110} />
  const images = [bike, beat, beverage]

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((idx + 1) % images.length)
    }, 500);
    return () => clearInterval(interval);
  }, [idx, images.length]);

  return (
    <div className={styles.container}>
      <Wrapper brew={brew}>
        <Icons brew={brew}>
          {images[idx]}
        </Icons>
        <About>
          ✿.｡ discover your neighborhood ｡.✿
        </About>
        <Link href="/search">
          <Start>START YOUR JOURNEY</Start>
        </Link>
      </Wrapper>
    </div>
  )
}

export default Home
