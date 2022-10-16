import { useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Moods = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const Label = styled.label<{checked?: boolean}>`
  margin: 10px;
  font-size: 30px;
  color: ${props => props.checked ? '#000' : 'inherit'};
  display: flex;

  @media only screen and (min-width: 700px) {
    font-size: 50px;
    padding: 0px;
    margin: 15px;
  }
`

const Selection = styled.div`
  margin-left: 40px;
  line-height: 40px;

  @media only screen and (min-width: 700px) {
    line-height: 30px;
  }
`

// fix - move 2 util
const randomMood = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

enum MOOD {
  SWEAT = 'Sweat',
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
    setMood(mood)
  }, [setMood, mood])

  const interpolateRadius = (speed: number) => {
    if (mood && transitTime) {
        // mood kmh - transitTime min - radius meter
        setRadius(speed * transitTime / 60 * 1000) // convert
    }
  }

  const checkMood = (mood: string, speed: number) => {
    setMood(mood)
    interpolateRadius(speed)
  }

  return (
    <>
      <Image src="/beat.png" alt="bike" width={110} height={90} />
      <Moods>
          <Label checked={mood === MOOD.SWEAT}>
              <input
                type="checkbox"
                checked={mood === MOOD.SWEAT}
                onChange={() => checkMood(MOOD.SWEAT, SPEED.SWEAT)}
              />
              <Selection>{`${MOOD.SWEAT}`}</Selection>
          </Label>
          <Label checked={mood === MOOD.CHILL}>
              <input
                type="checkbox"
                checked={mood === MOOD.CHILL}
                onChange={() => checkMood(MOOD.CHILL, SPEED.CHILL)}
              />
              <Selection>{`${MOOD.CHILL}`}</Selection>
          </Label>
          <Label checked={mood === MOOD.WHATEVER}>
              <input
                type="checkbox"
                checked={mood === MOOD.WHATEVER}
                onChange={() => checkMood(MOOD.WHATEVER, SPEED.WHATEVER)}
              />
              <Selection>{`${MOOD.WHATEVER}`}</Selection>
          </Label>
      </Moods>
    </>
  )
}

export default BeatSearch
