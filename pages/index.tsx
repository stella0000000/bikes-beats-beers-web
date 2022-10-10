import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>bikes, beats, and beers</title>
        <meta name="description" content="bike to beers while listening to beats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logos}>
          <Image src="/bike.png" alt="bike" width={140} height={80} />
          <Image src="/beat.png" alt="bike" width={100} height={100} />
          <Image src="/beer.png" alt="bike" width={90} height={100} />
        </div>
        <Link  href="/search">
          START YOUR JOURNEY
        </Link>
      </main>
    </div>
  )
}

export default Home
