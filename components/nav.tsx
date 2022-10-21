import styled from "styled-components";

const Wrapper = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 40px;
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

  @media only screen and (min-width: 700px) {
    padding-top: 10px;
  }
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