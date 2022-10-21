import styled from "styled-components";

const Wrapper = styled.div<{modalOpen?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

  @media only screen and (min-width: 650px) {
    font-size: 40px;
  }
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
}

const Nav = ({ children, modalOpen }: Props) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Nav