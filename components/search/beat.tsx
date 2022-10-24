import { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { MOOD, SPEED } from '../../utils/constants'

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

type BeatSearchProps = {
  mood?: string
  transitTime?: number
  setUserData: (key: string, data?: string | number) => void
}

const BeatSearch: React.FC<BeatSearchProps> = ({
  mood,
  setUserData,
  transitTime,
}) => {
  const [speed, setSpeed] = useState<number | undefined>(undefined)

  const checkMood = (mood: string, speed: number) => {
    setUserData('mood', mood)
    setSpeed(speed)
  }

  useEffect(() => {
    const interpolateRadius = (speed: number | undefined) => {
      if (speed && transitTime) setUserData('radius', (speed * transitTime / 60 * 1000))
      // mood kmh - transitTime min - radius meter
    }

    setUserData('mood', mood)
    if (speed && transitTime) interpolateRadius(speed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Label checked={mood === MOOD.RANDOM}>
          <input
            type="checkbox"
            checked={mood === MOOD.RANDOM}
            onChange={() => checkMood(MOOD.RANDOM, SPEED.RANDOM)}
          />
          <Selection>{`${MOOD.RANDOM}`}</Selection>
        </Label>
      </Moods>
    </>
  )
}

export default BeatSearch
