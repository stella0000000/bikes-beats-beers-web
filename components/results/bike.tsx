import { BREW } from "@utils/constants";
import { BrewContext } from "@utils/context";
import { BikeRide } from "@utils/map";
import { WxData } from "@utils/weather";
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";

type BikeResultProps = {
  bikeRide: BikeRide;
  weather: WxData;
};

const Logo = styled.div<{ brew?: string }>`
  -webkit-filter: ${(props) =>
    props.brew === BREW.COFFEE ? "none" : "invert(100%)"};
  filter: ${(props) => (props.brew === BREW.COFFEE ? "none" : "invert(100%)")};
`;

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
`;

export const BikeResult = ({ bikeRide, weather }: BikeResultProps) => {
  const brew = useContext(BrewContext);

  return (
    <>
      <Logo brew={brew}>
        <Image src="/bike.png" alt="bike" width={180} height={95} />
      </Logo>
      <Content>
        <div>{bikeRide.distance}</div>
        <div>{bikeRide.duration}</div>
        <div>
          {parseInt(weather.temp.toString())}°, {weather.description}
        </div>
      </Content>
    </>
  );
};
