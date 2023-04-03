import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

// POST /api/journey
// Required fields in body: userId
// destination, bike distance

// fix type
export default async function handle(req: any, res: any) {
  const { distance, destination } = req.body

  console.log(distance, destination)
  
  const session = await getSession({ req })

  const result = await prisma.journey.create({
    data: {
      distance,
      destination,
      user: { connect: { email: session?.user?.email as string } },
    },
  })

  res.json(result)
}