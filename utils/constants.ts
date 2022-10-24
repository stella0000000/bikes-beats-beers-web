export enum BUBBLES {
    BIKES = 'BIKES',
    BEATS = 'BEATS',
    BEERS = 'BEERS',
}

export enum MOOD {
    SWEAT = 'SWEAT',
    RELAX = 'RELAX',
    RANDOM = 'RANDOM'
}

// get a random speed from range
const randomSpeed = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

// unit: kmh
export enum SPEED {
    SWEAT = 32,
    RELAX = 17,
    RANDOM = randomSpeed(15, 35)
}