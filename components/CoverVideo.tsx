import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
// npm i --save-dev @types/react-native-video
// import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import { makeImgPath, makeVideoPath } from "../utils";
import { Dimensions, StyleSheet, Text } from "react-native";
import DetailHeader from "./DetailHeader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const View = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  margin: 0px 20px;
`;

const Button = styled.TouchableOpacity`
  padding-top: 10px;
  align-items: center;
  width: 50%;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 400;
`;

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
  const [isPhase, setIsPhase] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPhase((prev) => !prev);
  }, []);

  const toggleView = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <View>
        {isPlaying ? (
          <YoutubePlayer
            height={SCREEN_HEIGHT / 4}
            play={!isPhase}
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
      <BtnContainer>
        <Button onPress={toggleView}>
          <BtnText>{isPlaying ? "Show Title" : "Show Video"}</BtnText>
        </Button>
        <Button onPress={togglePlay}>
          {isPlaying ? (
            <BtnText>{isPhase ? "Playback" : "Phase"}</BtnText>
          ) : (
            <BtnText style={{ opacity: 0.5 }}>
              {isPhase ? "Playback" : "Phase"}
            </BtnText>
          )}
        </Button>
      </BtnContainer>
    </>
  );
};

export default CoverVideo;
