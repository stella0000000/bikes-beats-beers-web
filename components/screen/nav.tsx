import { BREW } from "@utils/constants";
import { Ctx } from "@utils/context";
import { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{modalOpen?: boolean, brew?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: ${props => props.brew === BREW.COFFEE ? '#C9C6BD' : 'black'};
  filter: ${props => props.modalOpen ? 'blur(20px)' : 'none'};
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
}

export const Nav = ({ children, modalOpen }: Props) => {
    const brew = useContext(Ctx)

    console.log(brew)
    return (
        <Wrapper modalOpen={modalOpen} brew={brew}>
            {children}
        </Wrapper>
    )
}