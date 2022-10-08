import styled from "styled-components";

const Prediction = styled.div`
    width: 300px;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
`

// fix type
// change onClick to grab start location

const Predictions = ({ predictions }: any) => {
    if (!predictions) return null;

    console.log(predictions)

    return (
        <ul>
            {predictions.map((prediction: any) =>
                <Prediction key={predictions.indexOf(prediction)} onClick={() => console.log(prediction.description)}>
                    {prediction.description}
                </Prediction>
            )}
        </ul>
    )
}

export default Predictions