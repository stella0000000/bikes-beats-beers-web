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
  flex-direction: column;
  font-size: 17px;
  padding: 25px;
  color: black;
  margin-top: -30px;

  @media only screen and (min-width: 800px) {
    padding: 200px;
    font-size: 25px;
    margin-top: 0px;
  }
`

type ModalProps = {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen
}) => {

  if (!modalOpen) return null

  return (
    <About>
      <span>Let&apos;s keep ourselves and the atmosphere healthy. Explore your neighborhood by biking to a beer (just one) while listening to beats.</span><br></br><br></br>
      <span>Share your location, desired transit time, and cycling mood. We&apos;ll suggest a playlist that suits your mood and surprise you with a destination to meet a friend. Report <s>bugs</s> praise to stella.choi@hyperisland.se.</span><br></br><br></br>
      Use responsibly.
    </About>
  )
}

export default Modal
