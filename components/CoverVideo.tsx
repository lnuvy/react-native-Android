import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
// npm i --save-dev @types/react-native-video
// import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import { makeImgPath, makeVideoPath } from "../utils";
import { Dimensions, StyleSheet } from "react-native";
import DetailHeader from "./DetailHeader";

// const YOUTUBE_API_KEY = "AIzaSyAubgzQNI2YF5pLw2f40nIzAWxgN2Y5n_g";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const View = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
`;
interface CoverVideoProps {
  path: string;
}

const CoverVideo: React.FC<CoverVideoProps> = ({ path }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isPlaying ? (
        <YoutubePlayer
          height={SCREEN_HEIGHT / 4}
          play={true}
          videoId={path}
          onChangeState={onStateChange}
        />
      ) : null}
    </View>
  );
};

export default CoverVideo;
