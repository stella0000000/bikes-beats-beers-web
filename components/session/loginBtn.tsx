import { useSession, signIn, signOut } from "next-auth/react"
import styled from "styled-components"

const Button = styled.button`
  margin-top: 200px;
  cursor: default;

  @media only screen and (min-width: 750px) {
    font-size: 40px;
  }
`

export default function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        {/* Signed in as {session.user?.name} <br /> */}
        <Button onClick={() => signOut()}>SIGN OUT</Button>
      </>
    )
  }
  
  return (
    <> 
      {/* redirect to search after sign in */}
      <Button onClick={() => signIn("google", { callbackUrl: '/search' })}>SIGN IN</Button>
    </>
  )
}