import styled from "styled-components";

const Wrapper = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  
  filter: ${props => props.modalOpen ? 'blur(25px)' : 'none'};
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
}

export const Nav = ({ children, modalOpen }: Props) => {
    return (
        <Wrapper modalOpen={modalOpen}>
            {children}
        </Wrapper>
    )
}