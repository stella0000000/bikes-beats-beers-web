import Link from "next/link";
import styled from "styled-components";

const Circle = styled.span<{isSelected?: boolean}>`
  height: 27px;
  width: 27px;
  border: 2px solid #BDFF00;
  background-color: ${props => props.isSelected ? '#BDFF00' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin: 0px 0px 20px 0px;
  
  &:not(:last-child) {
    margin-right: 25px;
  }
`

type Props = {
    bubble: string
    selected: boolean
}

export const Bubble = ({ bubble, selected }: Props) => {
    return (
        <Link href={`#${bubble}`}>
            <Circle isSelected={selected} />
        </Link>
    )
}