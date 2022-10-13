import { useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Moods = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const Label = styled.label<{checked?: boolean}>`
  padding: 2px;
  font-size: 30px;
  font-style: italic;
  color: ${props => props.checked ? '#000' : 'inherit'};
  font-weight: ${props => props.checked ? '700' : '400'};

  @media only screen and (min-width: 700px) {
    font-size: 55px;
    padding: 0px;
  }
`
// fix - move 2 util
const randomMood = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

enum MOOD {
    SWEAT = 'Workout',
    CHILL = 'Relax',
    WHATEVER = 'Whatever'
}

enum SPEED {
    SWEAT = 32,
    CHILL = 17,
    WHATEVER = randomMood(15, 35)
}

// fix types
interface Props {
    mood: any
    setMood: any
    transitTime: any
    setRadius: any
}

const BeatSearch: React.FC<Props> = ({
    mood,
    setMood,
    transitTime,
    setRadius
}) => {
  useEffect(() => {
    // setMood(mood)
    // console.log(mood)
  }, [mood])

  const interpolateRadius = (speed: number) => {
      if (mood && transitTime) {
          // mood kmh - transitTime min - radius meter
          setRadius(speed * transitTime / 60 * 1000) // convert
      }
  }

  return (
    <>
      <Image src="/beat.png" alt="bike" width={115} height={95} />
      <Moods>
          <Label checked={mood === MOOD.SWEAT}>
              <input
                  type="checkbox"
                  checked={mood === MOOD.SWEAT}
                  onChange={() => {
                      setMood(MOOD.SWEAT)
                      interpolateRadius(SPEED.SWEAT)
                      console.log(mood)
                  }}
              /> {`${MOOD.SWEAT}`}
          </Label>
          <Label checked={mood === MOOD.CHILL}>
              <input
                  type="checkbox"
                  checked={mood === MOOD.CHILL}
                  onChange={() => {
                      setMood(MOOD.CHILL)
                      interpolateRadius(SPEED.CHILL)
                      console.log(mood)
                  }}
              /> {`${MOOD.CHILL}`}
          </Label>
          <Label checked={mood === MOOD.WHATEVER}>
              <input
                  type="checkbox"
                  checked={mood === MOOD.WHATEVER}
                  onChange={() => {
                      setMood(MOOD.WHATEVER)
                      interpolateRadius(SPEED.WHATEVER)
                      console.log(mood)
                  }}
              /> {`${MOOD.WHATEVER}`}
          </Label>
      </Moods>
    </>
  )
}

export default BeatSearch
