import styled from "styled-components";

const Wrapper = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 10px;
  
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
}

const Nav = ({ children, modalOpen }: Props) => {
    return (
        <Wrapper modalOpen={modalOpen}>
            {children}
        </Wrapper>
    )
}

export default Nav