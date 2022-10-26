import Image from 'next/image'
import styled from "styled-components"

const MenuIcon = styled.div<{modalOpen?: boolean}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${props => props.modalOpen ? '10000' : '100'};
`

type BurgerMenuProps = {
    modalOpen: boolean
    setModalOpen: (modalOpen: boolean) => void
  }

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  modalOpen,
  setModalOpen
}) => (
  <MenuIcon modalOpen={modalOpen}>
      {modalOpen
          ? <Image
              src="/burgerClose.png"
              alt="bike"
              width={45}
              height={40}
              onClick={() => setModalOpen(false)}
          />
          : <Image
              src="/burger.png"
              alt="bike"
              width={50}
              height={35}
              onClick={() => setModalOpen(true)}
          />
      }
    </MenuIcon>
)