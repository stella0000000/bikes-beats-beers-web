import styled from "styled-components";

const PredictionList = styled.ul`
  position: absolute;
  top: 280px;
  z-index: 1000;
  padding: 0px 10px 7px 10px;
  background-color: #D3D3D3;
  width: 85vw;

  @media only screen and (min-width: 650px) {
    width: 61vw;
    top: 310px;
    margin: 0px;
  }
`

const Prediction = styled.div`
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  cursor: default;

  &:not(:last-child) {
    border-bottom: 1px solid white;
  }

  &:hover {
    color: #FF5EBE;
  }

  @media only screen and (min-width: 650px) {
    font-size: 30px;
    padding: 6px;
  }
`

// fix types
interface Props {
  predictions: any
  setPlaceID: any
  setLocation: any
  setPredictions: any
  setLocated: any
  located: boolean
}

const Predictions: React.FC<Props> = ({
  predictions,
  setPlaceID,
  setLocation,
  setPredictions,
  setLocated,
  located
}) => {
  if (!predictions || located) return null;

  return (
      <PredictionList>
          {predictions.map((prediction: any) => // fix type
              <Prediction
                  key={predictions.indexOf(prediction)}
                  onClick={() => {
                      setPlaceID(prediction.place_id)
                      setLocation(prediction.description)
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
