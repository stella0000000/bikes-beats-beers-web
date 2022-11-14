import { BREW } from './constants'

export const getBrew = (hour: number) => {
  // between 5:00 - 15:00 coffee
  if (5 < hour && hour < 15) {
    return BREW.COFFEE
  } else {
    return BREW.BEER
  }
}