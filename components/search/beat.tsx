import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { BREW, MOOD, SPEED } from '@utils/constants'
import { BrewContext } from '@utils/context'

const Logo = styled.div<{brew?: string}>`
  -webkit-filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
  filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
`

const Moods = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const Label = styled.label<{checked?: boolean, brew?: string}>`
  margin: 10px;
  font-size: 30px;
  display: flex;
  color: ${props => props.checked ? (props.brew === 'COFFEE' ? '#ff0095': '#ffa0d7') : (props.brew === 'COFFEE' ? '#000': '#fff')};

  align-items: center;
  display: flex;
  color: {}

  &:hover {
    color: ${props => props.brew === 'COFFEE' ? '#ff0095': '#ffa0d7'};
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
  const brew = useContext(BrewContext)
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
      <Logo brew={brew}>
        <Image src="/beat.png" alt="bike" width={110} height={90} priority={true} />
      </Logo>
      <Moods>
        <Label checked={mood === MOOD.SWEAT} brew={brew}>
          <input
            type="checkbox"
            checked={mood === MOOD.SWEAT}
            onChange={() => checkMood(MOOD.SWEAT, SPEED.SWEAT)}
          />
          <Selection>{`${MOOD.SWEAT}`}</Selection>
        </Label>
        <Label checked={mood === MOOD.RELAX} brew={brew}>
          <input
            type="checkbox"
            checked={mood === MOOD.RELAX}
            onChange={() => checkMood(MOOD.RELAX, SPEED.RELAX)}
          />
          <Selection>{`${MOOD.RELAX}`}</Selection>
        </Label>
        <Label checked={mood === MOOD.RANDOM} brew={brew}>
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
