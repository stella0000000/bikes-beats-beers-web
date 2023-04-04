import styled from 'styled-components'
import { View } from '@components/screen/view'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import prisma from 'lib/prisma'

const Welcome = styled.div`
  margin: 20px;
  font-size: 25px;
`

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
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

  const formatDate = (date: any) => {
    const input = new Date(date)
    const month = months[input.getUTCMonth()]
    const day = input.getUTCDate()

    return `${day} ${month}`
  }

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Please sign in</p>

  return (
    <View id={'placeholder'}>
      <Welcome>
        Your previous journeys, {session?.user?.name}:
      </Welcome>

      {journeys.map((journey: any) =>
      <li key={Math.random()}>
        <div>{formatDate(journey.created_at)}</div>
        <div>{journey.distance} to {journey.destination}</div>
        
      </li>
      )}
    </View>
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