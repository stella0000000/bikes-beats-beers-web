import Image from 'next/image'
import styled from "styled-components"

const MenuIcon = styled.div<{modalOpen?: boolean}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${props => props.modalOpen ? '10000' : '100'};
`

interface Props {
    modalOpen: boolean
    setModalOpen: (modalOpen: boolean) => void
  }

const BurgerMenu: React.FC<Props> = ({
    modalOpen,
    setModalOpen
  }) => (
    <MenuIcon modalOpen={modalOpen}>
        {modalOpen
            ? <Image
                src="/burgerClose.png"
                alt="bike"
                width={55}
                height={50}
                onClick={() => setModalOpen(false)}
            />
            : <Image
                src="/burger.png"
                alt="bike"
                width={60}
                height={45}
                onClick={() => setModalOpen(true)}
            />
        }
      </MenuIcon>
  )

export default BurgerMenu