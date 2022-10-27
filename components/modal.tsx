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
  color: white;
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

export const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen
}) => {

  if (!modalOpen) return null

  return (
    <About>
      <span>Let&apos;s keep ourselves and the atmosphere healthy. Explore your neighborhood by biking to a beer while listening to beats.</span><br></br><br></br>
      <span>Share your location, desired transit time, and cycling mood. You&apos;ll be surprised with a playlist that suits your mood and a destination to meet your friend. Report <s>bugs</s> praise to <a href="mailto:stella.choi@hyperisland.se">Stella ↗</a>. (That was a joke. Let me know if you notice bugs.)</span><br></br><br></br>
      Use responsibly. Have fun.
    </About>
  )
}