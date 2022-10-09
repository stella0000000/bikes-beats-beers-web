import styled from "styled-components";

interface Props {
    predictions: any
    setPlaceID: any
    startLocation: any
    setPredictions: any
}

const Prediction = styled.div`
    width: 300px;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
`

const Predictions: React.FC<Props> = ({
    predictions,
    setPlaceID,
    startLocation,
    setPredictions
}) => {
    if (!predictions) return null;

    console.log(predictions)

    return (
        <ul>
            {predictions.map((prediction: any) =>
                <Prediction
                    key={predictions.indexOf(prediction)}
                    onClick={() => {
                        setPlaceID(prediction.place_id)
                        startLocation(prediction.description)
                        setPredictions(undefined)
                    }}
                >
                    {prediction.description}
                </Prediction>
            )}
        </ul>
    )
}

export default Predictions