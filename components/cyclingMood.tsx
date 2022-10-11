const randomMood = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

enum MOOD {
    SWEAT = 'SWEAT',
    CHILL = 'CHILL',
    WHATEVER = 'WHATEVER'
}

enum SPEED {
    SWEAT = 32,
    CHILL = 17,
    WHATEVER = randomMood(15, 35)
}

// fix types
interface Props {
    mood: any
    setMood: any
    transitTime: any
    setRadius: any
}

const CyclingMood: React.FC<Props> = ({
    mood,
    setMood,
    transitTime,
    setRadius
}) => {
    const interpolateRadius = (speed: number) => {
        if (mood && transitTime) {
            // mood kmh - transitTime min - radius meter
            setRadius(speed * transitTime / 60 * 1000) // convert
        }
    }

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={mood===MOOD.SWEAT}
                    onChange={() => {
                        setMood(MOOD.SWEAT)
                        interpolateRadius(SPEED.SWEAT)
                    }}
                />
                SWEAT
            </label><br></br>
            <label>
                <input
                    type="checkbox"
                    checked={mood===MOOD.CHILL}
                    onChange={() => {
                        setMood(MOOD.CHILL)
                        interpolateRadius(SPEED.CHILL)
                    }}
                />
                CHILL
            </label><br></br>
            <label>
                <input
                    type="checkbox"
                    checked={mood===MOOD.WHATEVER}
                    onChange={() => {
                        setMood(MOOD.WHATEVER)
                        interpolateRadius(SPEED.WHATEVER)
                    }}
                />
                WHATEVER
            </label>
        </div>
    )
}

export default CyclingMood