import { useContext } from "react";
import styled from "styled-components";
import { BREW } from "@utils/constants";
import { BrewContext } from "@utils/context";

const Wrapper = styled.div<{modalOpen?: boolean, brew?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  filter: ${props => props.modalOpen ? 'blur(20px)' : 'none'};
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
}

export const Nav = ({ children, modalOpen }: Props) => {
    const brew = useContext(BrewContext)

    return (
        <Wrapper modalOpen={modalOpen} brew={brew}>
            {children}
        </Wrapper>
    )
}