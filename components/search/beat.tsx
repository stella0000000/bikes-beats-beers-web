import { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { MOOD, SPEED } from '@utils/constants'

const Logo = styled.div`
  -webkit-filter: invert(100%);
  filter: invert(100%);
`

const Moods = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const Label = styled.label<{checked?: boolean}>`
  margin: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
  color: ${props => props.checked ? '#ffa0d7' : '#c9c9c9'};
  display: flex;

  &:hover {
    color: #ffa0d7;
  }

  @media only screen and (min-width: 700px) {
    font-size: 50px;
    padding: 0px;
    margin: 15px;
  }
`

const Selection = styled.div`
  margin-left: 20px;
  line-height: 30px;

  @media only screen and (min-width: 700px) {
    line-height: 40px;
  }
`

type BeatSearchProps = {
  mood?: string
  transitTime?: number
  setUserData: (key: string, data?: string | number) => void
}

export const BeatSearch: React.FC<BeatSearchProps> = ({
  mood,
  transitTime,
  setUserData,
}) => {
  const [speed, setSpeed] = useState<number | undefined>(undefined)

  const checkMood = (mood: string, speed: number) => {
    setUserData('mood', mood)
    setSpeed(speed)
  }

  useEffect(() => {
    const interpolateRadius = (speed: number) => {
      if (speed && transitTime) setUserData('radius', (speed * transitTime / 60 * 1000))
      // mood kmh - transitTime min - radius meter
    }

    setUserData('mood', mood)
    if (speed && transitTime) interpolateRadius(speed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, speed, transitTime])

  return (
    <>
      <Logo>
        <Image src="/beat.png" alt="bike" width={110} height={90} />
      </Logo>
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
