import { BREW } from './constants'

const now = new Date()
const hour = now.getHours()

export const getBrew = () => {
  // between 5:00 - 15:00 coffee
  if (5 < hour && hour < 15) {
    return BREW.COFFEE
  } else {
    return BREW.BEER
  }
}