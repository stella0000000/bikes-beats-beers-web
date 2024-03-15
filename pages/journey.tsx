import Link from "next/link";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRef, useState } from "react";
import styled from "styled-components";
import { BUBBLES } from "@utils/constants";
import { fetchBrew, fetchBikeRide, fetchDetails } from "@utils/map";
import { fetchPlaylist } from "@utils/playlist";
import { fetchWeather } from "@utils/weather";
import { Bubble } from "@components/bubble";
import { Nav } from "@components/screen/nav";
import { Screen } from "@components/screen/screen";
import { View } from "@components/screen/view";
import { BeatResult } from "@components/results/beat";
import { BrewResult } from "@components/results/brew";
import { BikeResult } from "@components/results/bike";

const BubbleWrap = styled.div`
  display: flex;
`;

type ServerSideProps = {
  destination: any;
  playlist: any;
  bikeRide: any;
  details: any;
  weather: any;
};

type JourneyProps = {
  modalOpen: boolean;
};

const Journey = ({
  destination,
  playlist,
  bikeRide,
  details,
  weather,
  modalOpen,
}: ServerSideProps & JourneyProps) => {
  const views = useRef(null);
  const [selectedBubble, setSelectedBubble] = useState<string>(BUBBLES.BIKES);

  // console.log({ destination, playlist, bikeRide, details, weather });

  return (
    <>
      <Screen
        views={views}
        modalOpen={modalOpen}
        setSelectedBubble={setSelectedBubble}
      >
        <View id={BUBBLES.BIKES}>
          <BikeResult bikeRide={bikeRide} weather={weather} />
        </View>
        <View id={BUBBLES.BEATS}>
          <BeatResult playlist={playlist} />
        </View>
        <View id={BUBBLES.BREWS}>
          <BrewResult destination={destination} details={details} />
        </View>
      </Screen>

      <Nav modalOpen={modalOpen}>
        <BubbleWrap>
          <Bubble
            bubble={BUBBLES.BIKES}
            selected={selectedBubble === BUBBLES.BIKES}
          />
          <Bubble
            bubble={BUBBLES.BEATS}
            selected={selectedBubble === BUBBLES.BEATS}
          />
          <Bubble
            bubble={BUBBLES.BREWS}
            selected={selectedBubble === BUBBLES.BREWS}
          />
        </BubbleWrap>
        <Link href="/search">
          <button>↻ NEW JOURNEY</button>
        </Link>
      </Nav>
    </>
  );
};

export default Journey;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  let { radius, lat, lng, mood, brew } = ctx.query;

  if (!radius || !lat || !lng || !mood) {
    return Promise.resolve({
      redirect: {
        destination: "/search",
        permanent: false,
      },
    });
  }

  return fetchBrew(brew, lat, lng, radius).then(async (destination) => {
    const bikeRide = await fetchBikeRide(destination, lat!, lng!);
    const details = await fetchDetails(destination);
    const weather = await fetchWeather(lat!, lng!);
    const playlist = await fetchPlaylist(mood!);

    return {
      props: {
        destination,
        playlist,
        bikeRide,
        details,
        weather,
      },
    };
  });
};
