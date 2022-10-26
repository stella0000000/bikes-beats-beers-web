import Image from "next/image";
import styled from "styled-components";

const Logo = styled.div`
  -webkit-filter: invert(100%);
  filter: invert(100%);
`

const PlaylistLink = styled.div`
  width: 85vw;
  padding-bottom: 10px;

  @media only screen and (min-width: 700px) {
    max-width: 50vw;
  }
`
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  height: 70%;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`

// fix type
export const BeatResult = ({ playlist }: any) => {
    return (
        <>
        <Logo>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
        </Logo>
          <Content>
            <PlaylistLink>
              <a href={`${playlist[1]}`} target="_blank" rel="noreferrer">{playlist[0]}</a>
            </PlaylistLink>
            <Image src={`${playlist[3]}`} alt="playlist image" width={150} height={150} />
          </Content>
        </>
    )
    
}