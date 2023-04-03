import prisma from "./prisma"

// export const createJourney = async (userId: string, ) => {
//   try {
//     const userFromDB = await prisma.journey.create({
//       data: user
//     })
//     return { user: userFromDB }
//   } catch (error) {
//     return { error }
//   }
// }

// export const getAllJourneys = async (userId: string) => {
//   try {
//     const journeys = await prisma.user.findUnique({
//       where: { userId }
//     })
//     return { journeys }
//   } catch (error) {
//     return { error }
//   }
// }