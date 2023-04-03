import prisma from "./prisma"

export const createUser = async (user: any) => {
  try {
    const userFromDB = await prisma.user.create({ data: user })
    return { user: userFromDB }
  } catch (error) {
    return { error }
  }
}

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return { user }
  } catch (error) {
    return { error }
  }
}