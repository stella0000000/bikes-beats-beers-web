import styled from 'styled-components'

const About = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  text-align: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  padding: 50px;

  @media only screen and (min-width: 800px) {
    padding: 200px;
    font-size: 30px;
  }
`

// fix type
interface Props {
  modalOpen: any,
  setModalOpen: any,
}

const Modal: React.FC<Props> = ({
  modalOpen,
  setModalOpen
}) => {

  if (!modalOpen) return null

  return (
    <About>
      Let&apos;s keep ourselves and the atmosphere healthy. Explore your neighborhood by biking to beers, while listening to beats.<br></br><br></br>
      Share your location, desired transit time, and cycling mood. We&apos;ll find a playlist that suites your mood, and surprise you with a destination to meet your friend 😘<br></br><br></br>
      Use responsibly.
    </About>
  )
}

export default Modal
