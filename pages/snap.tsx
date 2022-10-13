import Image from 'next/image'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import CyclingMood from '../components/cyclingMood'

enum Dot {
  BIKE = 'BIKE',
  BEATS = 'BEATS'
}

const Container = styled.div`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
`

const View = styled.div`
  min-width: 100vw;
  height: 60vh;
  scroll-snap-align: start;
  text-align: center;
  position: relative;
`

const Tile = styled.div`
  position: absolute;
  top: 40%;
  transform: none;
  text-align: center;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Location = styled.input`
  width: 300px;
`

const Transit = styled.input`
    width: 100px;
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Bubble = styled.span<{selected?: boolean}>`
  height: 20px;
  width: 20px;
  border: 1px solid #B5A642;
  background-color: ${props => props.selected ? '#B5A642' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin: 20px 10px 0px 0px;
`

const Snap = () => {
  const [selectBubble, setSelectBubble] = useState<boolean>(true)
  const views = useRef(null)

  return (
    <>
      <Container
        ref={views}
        onScroll={e => {
          const ele = e.target as HTMLInputElement
          setSelectBubble(ele.scrollLeft < ele.scrollWidth/2 - ele.scrollWidth/4)
        }}
      >
        <View>
          <Tile>
            <Image src="/bike.png" alt="bike" width={165} height={95} />
            <Location
                type="text"
                placeholder="Current location"
            />
            Desired transit time
            <span>
                <Transit
                    type="number"
                    placeholder="00"
                    // onChange={e => setTransitTime(parseInt(e.target.value))}
                /> minutes
            </span>
          </Tile>
        </View>
        <View>
          <Tile>
          <Image src="/beat.png" alt="bike" width={110} height={120} />

          <CyclingMood
              mood={null}
              setMood={null}
              transitTime={null}
              setRadius={null}
          />
          </Tile>
        </View>
      </Container>
      <Button>
        <div>
          <button
            onClick={() =>setSelectBubble(!selectBubble)}
              // disabled={!coords || !mood || !transitTime || !radius}
          >
              FIND BEATS AND BEERS
          </button>
        </div>
        <div>
          <Bubble selected={selectBubble} />
          <Bubble selected={!selectBubble} />
        </div>
      </Button>
    </>
  )

}

export default Snap
