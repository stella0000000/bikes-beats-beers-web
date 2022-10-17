import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Modal from '@components/modal'

enum DOT {
  BIKES = 'BIKES',
  BEATS = 'BEATS',
  BEERS = 'BEERS'
}

const MenuIcon = styled.div<{modalOpen?: boolean}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${props => props.modalOpen ? '10000' : '100'};
`

const Container = styled.div<{modalOpen?: boolean}>`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 65vh;
  filter: ${props => props.modalOpen ? 'blur(40px)' : 'none'};

  @media only screen and (min-width: 650px) {
    min-height: 65vh;
  }
`

const View = styled.div`
  min-width: 100vw;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  transform: none;
  width: 100%;
  left: 0;
  font-size: 30px;
  color: black;

  @media only screen and (min-width: 650px) {
    font-size: 40px;
  }
`

const Button = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

  @media only screen and (min-width: 650px) {
    font-size: 40px;
  }
`

const Bubble = styled.span<{selected?: boolean}>`
  height: 27px;
  width: 27px;
  border: 2px solid #BDFF00;
  background-color: ${props => props.selected ? '#BDFF00' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin: 30px 12px 25px 12px;
`

// fix type
const Journey = (props: any) => {
  const views = useRef(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectBubble, setSelectBubble] = useState<string>(DOT.BIKES)

  console.log({ props })
  return (
    <>
      <MenuIcon modalOpen={modalOpen}>
        {modalOpen
           ? <Image src="/burgerClose.png" alt="bike" width={55} height={50} onClick={() => setModalOpen(false)}/>
          : <Image src="/burger.png" alt="bike" width={60} height={45} onClick={() => setModalOpen(true)}/>
        }
      </MenuIcon>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <Container
        ref={views}
        modalOpen={modalOpen}
        onScroll={e => {
          const ele = e.target as HTMLInputElement
          if (ele.scrollLeft < ele.scrollWidth/3 - ele.scrollWidth/6) {
            setSelectBubble(DOT.BIKES)
          } else if (ele.scrollLeft > ele.scrollWidth/3) { // fix for center
            setSelectBubble(DOT.BEERS)
          } else {
            setSelectBubble(DOT.BEATS)
          }
        }}
      >
        <View>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
          YOUR BIKE RIDE
        </View>
        <View>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
          YOUR BEATS
        </View>
        <View>
          <Image src="/beer.png" alt="beer" width={100} height={90} />
          YOUR BEERS
        </View>
      </Container>

      <Button modalOpen={modalOpen}>
        <div>
          <Bubble selected={selectBubble === DOT.BIKES} />
          <Bubble selected={selectBubble === DOT.BEATS} />
          <Bubble selected={selectBubble === DOT.BEERS} />
        </div>
        <Link href='/search'>
          <button>↻ NEW JOURNEY</button>
        </Link>
      </Button>
    </>
  )
}

export default Journey

// fix type
export  const getServerSideProps= (ctx: any)=> {
  const query = ctx.query

  return {
      props: {
         destination: query.destination,
         playlist: query.playlist
      }
  }
}
