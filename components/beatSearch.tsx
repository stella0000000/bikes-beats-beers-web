import Image from 'next/image'
import styled from 'styled-components'
import CyclingMood from './cyclingMood'

const Moods = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 3.5vw;
`

const Label = styled.label`
  color: white;
  padding: 0.7vw;

`

// move 2 util
const randomMood = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

enum MOOD {
    SWEAT = 'SWEAT',
    CHILL = 'CHILL',
    WHATEVER = 'WHATEVER'
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
    const interpolateRadius = (speed: number) => {
        if (mood && transitTime) {
            // mood kmh - transitTime min - radius meter
            setRadius(speed * transitTime / 60 * 1000) // convert
        }
    }
  return (
    <>
      <Image src="/beat.png" alt="bike" width={110} height={120} />
      <Moods>
          <Label>
              <input
                  type="checkbox"
                  checked={mood===MOOD.SWEAT}
                  onChange={() => {
                      setMood(MOOD.SWEAT)
                      interpolateRadius(SPEED.SWEAT)
                  }}
              /> SWEAT
          </Label>
          <Label>
              <input
                  type="checkbox"
                  checked={mood===MOOD.CHILL}
                  onChange={() => {
                      setMood(MOOD.CHILL)
                      interpolateRadius(SPEED.CHILL)
                  }}
              /> CHILL
          </Label>
          <Label>
              <input
                  type="checkbox"
                  checked={mood===MOOD.WHATEVER}
                  onChange={() => {
                      setMood(MOOD.WHATEVER)
                      interpolateRadius(SPEED.WHATEVER)
                  }}
              /> WHATEVER
          </Label>
      </Moods>
    </>
  )
}

export default BeatSearch
