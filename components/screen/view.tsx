import styled from "styled-components"

const Wrapper = styled.div`
  min-width: 100vw;
  position: relative;
  scroll-snap-align: start;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  transform: none;
  width: 100%;
  left: 0;
  font-size: 30px;
  color: black;
  text-align: center;

  @media only screen and (min-width: 650px) {
    font-size: 20px;
  }
`


type Props = {
  id: string,
  children: JSX.Element | JSX.Element[]
}

const View = ({ id, children}: Props) => {
  return (
    <Wrapper id={id}>
      {children}
    </Wrapper>
  )
}

export default View