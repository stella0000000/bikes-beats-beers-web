import Image from 'next/image'
import styled from 'styled-components'
import CyclingMood from '../components/cyclingMood'

const Container = styled.div`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
`

const View = styled.div`
  border-right: 1px solid white;
  padding: 1rem;
  min-width: 100vw;
  height: 90vh;
  scroll-snap-align: start;
  text-align: center;
  position: relative;
`

const Tile = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

const Snap = () => {
  return (
    <>
      <Container>
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
                    onChange={e => setTransitTime(parseInt(e.target.value))}
                /> minutes
            </span>
          </Tile>
        </View>
        <View>
          <Tile>
          <Image src="/beat.png" alt="bike" width={110} height={120} />

          <CyclingMood
              // mood={mood}
              // setMood={setMood}
              // transitTime={transitTime}
              // setRadius={setRadius}
          />

          <button
              // disabled={!coords || !mood || !transitTime || !radius}
          >
              FIND BEATS AND BEERS
          </button>
          </Tile>
        </View>
      </Container>
      test
    </>
  )

}

export default Snap
