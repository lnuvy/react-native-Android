import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
// npm i --save-dev @types/react-native-video
// import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import { makeImgPath, makeVideoPath } from "../utils";
import { Dimensions, StyleSheet } from "react-native";
import DetailHeader from "./DetailHeader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const View = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
`;

const Button = styled.Button``;
interface CoverVideoProps {
  videoKey: string;
  title: string;
  posterPath: string;
  backDrop: string;
}

const CoverVideo: React.FC<CoverVideoProps> = ({
  videoKey,
  title,
  backDrop,
  posterPath,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  const toggleView = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        {isPlaying ? (
          <YoutubePlayer
            height={SCREEN_HEIGHT / 4}
            play={true}
            videoId={videoKey}
            onChangeState={onStateChange}
          />
        ) : (
          <DetailHeader
            title={title}
            posterPath={posterPath}
            backDrop={backDrop}
          />
        )}
      </View>
      <Button
        title={isPlaying ? "Show Poster/Title" : "Show Video"}
        onPress={toggleView}
      />
    </>
  );
};

export default CoverVideo;
