import Image from 'next/image'
import styled from 'styled-components'
import Predictions from '@components/predictions'

const Location = styled.input`
  width: 70vw;
  margin-top: 12vw;
  @media only screen and (min-width: 700px) {
    margin-top: 30px;
    width: 60vw;
  }
`

const Transit = styled.input`
  width: 30vw;
`

const Text = styled.div`
  margin: 7vw 0vw 2vw 0vw;
  font-size: 20px;
  @media only screen and (min-width: 700px) {
    font-size: 40px;
    margin-top: 50px;
    width: 60vw;
  }
`

const TransitTime = styled.div`
  width: 70vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 700px) {
    width: 60vw;
  }
`

const Min = styled.span`
  color: #000;
  font-size: 20px;
  @media only screen and (min-width: 700px) {
    font-size: 45px;
  }
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
      <Image src="/bike.png" alt="bike" width={180} height={95} />
      <Location
          type="text"
          placeholder="Start location"
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
      <TransitTime>
          <Transit
              type="number"
              placeholder="00"
              onChange={e => setTransitTime(parseInt(e.target.value))}
          /> <Min>minutes</Min>
      </TransitTime>
    </>
  )
}

export default BikeSearch
