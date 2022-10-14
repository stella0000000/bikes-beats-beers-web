import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import styled from 'styled-components'

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Start = styled.button`
  font-size: 25px;
  margin-top: 140px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 50px;
  }
`

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>bikes, beats, and beers</title>
        <meta name="description" content="bike to beers while listening to beats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Icons>
          <Image src="/bike.png" alt="bike" width={160} height={90} />
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          <Image src="/beer.png" alt="bike" width={100} height={90} />
        </Icons>
        <Link href="/search">
          <Start>START YOUR JOURNEY</Start>
        </Link>
      </main>
    </div>
  )
}

export default Home
