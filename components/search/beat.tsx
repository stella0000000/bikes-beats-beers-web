import { useState, useEffect } from 'react'
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

  &:hover {
    color: black;
  }

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
const randomSpeed = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

enum MOOD {
  SWEAT = 'SWEAT',
  RELAX = 'RELAX',
  WHATEVER = 'WHATEVER'
}

enum SPEED {
  SWEAT = 32,
  RELAX = 17,
  WHATEVER = randomSpeed(15, 35)
}

type BeatSearchProps = {
  mood?: string
  setMood: (mood?: string) => void
  transitTime?: number
  setRadius: (speed?: number) => void
}

const BeatSearch: React.FC<BeatSearchProps> = ({
  mood,
  setMood,
  transitTime,
  setRadius
}) => {
  const [speed, setSpeed] = useState<number | undefined>(undefined)

  const checkMood = (mood: string, speed: number) => {
    setMood(mood)
    setSpeed(speed)
  }

  useEffect(() => {
    const interpolateRadius = (speed: number | undefined) => {
      if (speed && transitTime) setRadius(speed * transitTime / 60 * 1000)
      // mood kmh - transitTime min - radius meter
    }

    setMood(mood)
    if (speed && transitTime) interpolateRadius(speed)
  }, [mood, speed, transitTime])

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
        <Label checked={mood === MOOD.RELAX}>
          <input
            type="checkbox"
            checked={mood === MOOD.RELAX}
            onChange={() => checkMood(MOOD.RELAX, SPEED.RELAX)}
          />
          <Selection>{`${MOOD.RELAX}`}</Selection>
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
