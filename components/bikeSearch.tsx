import Image from 'next/image'
import styled from 'styled-components'
import Predictions from '../components/predictions'

const Location = styled.input`
  width: 300px;
`

const Transit = styled.input`
    width: 100px;
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
      Desired transit time
      <span>
          <Transit
              type="number"
              placeholder="00"
              onChange={e => setTransitTime(parseInt(e.target.value))}
          /> minutes
      </span>
    </>
  )
}

export default BikeSearch
