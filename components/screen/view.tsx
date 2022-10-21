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
  color: black;
  text-align: center;
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