import Image from 'next/image'
import styled from 'styled-components'
import Predictions from '../components/predictions'

const Location = styled.input`
  width: 70vw;
  margin-top: 3vw;
`

const Transit = styled.input`
  width: 20vw;
`

const Text = styled.div`
  font-style: italic;
  margin: 10vw 0vw 2vw 0vw;

`

const Min = styled.span`
  color: #FF0099;
  font-weight: 700;
`

// fix type
interface Props {
  setTransitTime: any,
  predictions: any,
  setPredictions: any,
  setPlaceID: any,
  located: any,
  setLocated: any,
  location: any,
  setLocation: any,
}

const BikeSearch: React.FC<Props> = ({
  setTransitTime,
  predictions,
  setPredictions,
  setPlaceID,
  located,
  setLocated,
  location,
  setLocation
}) => {
  return (
    <>
      <Image src="/bike.png" alt="bike" width={165} height={95} />
      <Location
          type="text"
          placeholder="Current location"
          onChange={e => {
              setLocation(e.target.value)
              setLocated(false)
              e.target.value==='' ? setPredictions(undefined) : null
          }}
          value={location}
      />
      <Predictions
          predictions={predictions && Array.isArray(predictions) ? predictions : null}
          setPlaceID={setPlaceID}
          setLocated={setLocated}
          setLocation={setLocation}
          setPredictions={setPredictions}
          located={located}
      />
      <Text>Desired transit time</Text>
      <span>
          <Transit
              type="number"
              placeholder="00"
              onChange={e => setTransitTime(parseInt(e.target.value))}
          /> <Min>min</Min>
      </span>
    </>
  )
}

export default BikeSearch
