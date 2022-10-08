import React from 'react'

// fix type

const Predictions = ({ predictions }: any) => {
    if (!predictions) return null;
    
    return (
        <ul>
            {predictions.map((prediction: any) =>
                <li>
                    {prediction.description}
                </li>
            )}
        </ul>
    )
}

export default Predictions