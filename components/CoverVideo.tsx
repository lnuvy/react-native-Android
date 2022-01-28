import React from "react";
import styled from "styled-components/native";
// npm i --save-dev @types/react-native-video
import Video from "react-native-video";
import { makeVideoPath } from "../utils";
import { StyleSheet } from "react-native";

interface CoverVideoProps {
  path: string;
}

const CoverVideo: React.FC<CoverVideoProps> = ({ path }) => {
  console.log("CoverVideo 13번: ", makeVideoPath(path));

  return (
    <Video
      style={StyleSheet.absoluteFill}
      source={{
        uri: makeVideoPath(path),
      }}
      paused={true} // 재생/중지 여부
      onLoad={(e) => console.log("!!!!!!!", e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
      repeat={false}
    />
  );
};

export default CoverVideo;
