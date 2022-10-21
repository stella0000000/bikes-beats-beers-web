import styled from "styled-components";

const PredictionList = styled.ul`
  position: absolute;
  top: 260px;
  z-index: 1000;
  padding: 0px 10px 7px 12px;
  background-color: #D3D3D3;
  width: 85vw;

  @media only screen and (min-width: 650px) {
    width: 61vw;
    top: 280px;
    margin: 0px;
  }
`

const Prediction = styled.div`
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 3px 5px;
  cursor: default;
  text-align: left;

  &:not(:last-child) {
    border-bottom: 1px solid white;
  }

  &:hover {
    color: #FF5EBE;
  }

  @media only screen and (min-width: 650px) {
    font-size: 30px;
    padding: 5px;
  }
`

export type Prediction = {
  description: string
  matched_substrings: []
  place_id: string
  reference: string
  structured_formatting: string
  terms: []
  types: string[]
}

type PredictionsProps = {
  setUserData: (key: string, data: string | number) => void
  predictions?: Prediction[]
  setPredictions: (predictions?: Prediction[]) => void
  located: boolean
  setLocated: (located: boolean) => void
}

const Predictions: React.FC<PredictionsProps> = ({
  predictions,
  setUserData,
  setPredictions,
  setLocated,
  located
}) => {
  if (!predictions || located) return null;

  return (
      <PredictionList>
          {predictions.map((prediction: Prediction) =>
              <Prediction
                  key={predictions.indexOf(prediction)}
                  onClick={() => {
                    setUserData('locationInput', prediction.description)
                    setUserData('placeID', prediction.place_id)
                    setPredictions(undefined)
                    setLocated(true)
                  }}
              >
                  {prediction.description}
              </Prediction>
          )}
      </PredictionList>
  )
}

export default Predictions
