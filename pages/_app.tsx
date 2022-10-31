import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '@styles/globals.css'
import { BurgerMenu } from '@components/burgerMenu'
import { Modal } from '@components/modal'
import { getBrew } from '@utils/getBrew'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [brew, setBrew] = useState<string | undefined>()

  return (
    <>
      <Head>
        <title>bikes, beats, and brews</title>
        <meta name="description" content="bike to brews while listening to beats" />
        <link rel="icon" href="/images/favicon.ico" />
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
