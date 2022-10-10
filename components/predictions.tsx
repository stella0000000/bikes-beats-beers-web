import styled from "styled-components";

const Prediction = styled.div`
    width: 300px;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
`

// fix types
interface Props {
    predictions: any
    setPlaceID: any
    // startLocation: any
    setLocation: any
    setPredictions: any
}

const Predictions: React.FC<Props> = ({
    predictions,
    setPlaceID,
    // startLocation,
    setLocation,
    setPredictions
}) => {
    if (!predictions) return null;

    return (
        <ul>
            {predictions.map((prediction: any) => // fix type
                <Prediction
                    key={predictions.indexOf(prediction)}
                    onClick={() => {
                        setPlaceID(prediction.place_id)
                        // startLocation(prediction.description)
                        setLocation(prediction.description)
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