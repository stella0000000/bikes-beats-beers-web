import styled from "styled-components";

const Prediction = styled.div`
    width: 60vw;
    font-size: 3vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0px;
    cursor: default;
    max-height: 5vw;
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
        <ul>
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
        </ul>
    )
}

export default Predictions
