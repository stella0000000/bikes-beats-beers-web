import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import BurgerMenu from '@components/burgerMenu'
import Modal from '@components/modal'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>bikes, beats, and beers</title>
        <meta name="description" content="bike to beers while listening to beats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {router.pathname !== "/" ?
        (
          <>
            <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </>
        )
        : null
      }
      
      <Component {...pageProps} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export default MyApp
