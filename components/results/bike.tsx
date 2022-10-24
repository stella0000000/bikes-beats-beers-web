import Image from "next/image"
import styled from "styled-components"

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  height: 70%;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`

// fix type
const BikeResult = ({ bikeRide, weather }: any) => {
    return (
        <>
            <Image src="/bike.png" alt="bike" width={180} height={95} />
            <Content>
                {bikeRide.distance}<br></br>
                {bikeRide.duration}<br></br><br></br>
                {parseInt(weather.temp)}°, {weather.description}
            </Content>
        </>
    )
}

export default BikeResult