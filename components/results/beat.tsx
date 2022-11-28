import { BREW } from "@utils/constants";
import { BrewContext } from "@utils/context";
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";

const Logo = styled.div<{brew?: string}>`
  -webkit-filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
  filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
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

export const BeatResult = ({ playlist }: any) => {
  const brew = useContext(BrewContext)
    return (
        <>
        <Logo brew={brew}>
          <Image src="/beat.png" alt="bike" width={110} height={90} />
        </Logo>
          <Content>
            <PlaylistLink>
              <a href={`${playlist[1]}`} target="_blank" rel="noreferrer">{playlist[0]} ↗</a>
            </PlaylistLink>
            <Image src={`${playlist[3]}`} alt="playlist image" width={150} height={150} />
          </Content>
        </>
    )
    
}