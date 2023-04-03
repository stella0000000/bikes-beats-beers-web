import { useContext } from 'react'
import styled from 'styled-components'
import { BrewContext } from '@utils/context'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import prisma from 'lib/prisma'

type ServerSideProps = {
  journeys: any
}

type Props = {
  modalOpen: boolean
}

const Profile = ({
  modalOpen,
  journeys
}: Props & ServerSideProps) => {
  const { data: session, status } = useSession()
  const brew = useContext(BrewContext)

  // get user's journeys
  console.log({ journeys })

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Please sign in</p>

  return (
    <>
      Welcome {session?.user?.name}!
    </>
  )
}

export default Profile


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 403
    return { props: { journeys: [] } }
  }

  const allJourneys = await prisma.journey.findMany({
    where: {
      user: { email: session?.user?.email },
    },
    include: {
      user: {
        select: {
          name: true
        },
      },
    },
  })
  
  const journeys = JSON.parse(JSON.stringify(allJourneys))

  return {
    props: { journeys },
  }
}