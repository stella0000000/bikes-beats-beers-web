import Image from 'next/image'
import styled from 'styled-components'
import { Predictions, Prediction } from '@components/predictions/predictions'

const Logo = styled.div`
  -webkit-filter: invert(100%);
  filter: invert(100%);
`

const Location = styled.input`
  width: 80vw;
  margin-top: 12vw;

  @media only screen and (min-width: 650px) {
    margin-top: 30px;
    width: 60vw;
  }
`

const Transit = styled.input`
  width: 30vw;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  margin: 7vw 0vw 0.5vw 0vw;
  font-size: 20px;
  text-align: left;
  
  @media only screen and (min-width: 650px) {
    font-size: 40px;
    margin-top: 50px;
    width: 60vw;
  }
`

const TransitTime = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 650px) {
    width: 60vw;
  }
`

const Min = styled.span`
  font-size: 20px;
  
  @media only screen and (min-width: 650px) {
    font-size: 45px;
  }
`

type BrewSearchProps = {
  predictions?: Prediction[]
  setPredictions: (predictions?: Prediction[]) => void
  located: boolean
  setLocated: (located: boolean) => void
  locationInput?: string
  setUserData: (key: string, data: string | number) => void
}

export const BrewSearch: React.FC<BrewSearchProps> = ({
  predictions,
  setPredictions,
  located,
  setLocated,
  locationInput,
  setUserData
}) => (
  <>
    <Logo>
      <Image src="/bike.png" alt="bike" width={180} height={95} />
    </Logo>
    <Location
        type="text"
        placeholder="Start location"
        onChange={e => {
          setUserData('locationInput', e.target.value)
            setLocated(false)
            e.target.value==='' ? setPredictions(undefined) : null
        }}
        value={locationInput || ''}
    />
    <Predictions
        predictions={predictions && Array.isArray(predictions) ? predictions : undefined}
        setLocated={setLocated}
        setUserData={setUserData}
        setPredictions={setPredictions}
        located={located}
    />
    <Container>
      <Text>Desired transit time</Text>
      <TransitTime>
          <Transit
              type="number"
              placeholder="00"
              onChange={e => setUserData('transitTime', (parseInt(e.target.value)))}
              onWheel={(e) => e.currentTarget.blur()}
          /> <Min>minutes</Min>
      </TransitTime>
    </Container>
  </>
)