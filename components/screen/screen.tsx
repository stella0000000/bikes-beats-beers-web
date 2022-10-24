import React, { MutableRefObject } from "react"
import styled from "styled-components"
import { BUBBLES } from "../../constants"

const Container = styled.div<{modalOpen?: boolean}>`
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    display: flex;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 65vh;
    filter: ${props => props.modalOpen ? 'blur(30px)' : 'none'};

    @media only screen and (min-width: 650px) {
        height: 75vh;
    }
`

type Props = {
    children: JSX.Element[]
    modalOpen: boolean
    views: MutableRefObject<null>
    setSelectedBubble: (bubble: string) => void
}

const Screen = ({ children, modalOpen, views, setSelectedBubble
}: Props) => {
    const numChildren = children.length

    const handleScroll = (e: any) => {
        const ele = e.target as HTMLInputElement
        if (numChildren === 2) {
            if (ele.scrollLeft < ele.scrollWidth/2 - ele.scrollWidth/4) {
                setSelectedBubble(BUBBLES.BIKES)
            } else {
                setSelectedBubble(BUBBLES.BEATS)
            }
        } else if (numChildren ===3) {
            if (ele.scrollLeft < ele.scrollWidth/3 - ele.scrollWidth/6) {
                setSelectedBubble(BUBBLES.BIKES)
            } else if (ele.scrollLeft > ele.scrollWidth/3) { // fix for center
                setSelectedBubble(BUBBLES.BEERS)
            } else {
                setSelectedBubble(BUBBLES.BEATS)
            }
        }
    }

    return (
        <Container
            ref={views}
            modalOpen={modalOpen}
            onScroll={e => handleScroll(e)}
        >
            {children}
        </Container>
    )
}

export default Screen