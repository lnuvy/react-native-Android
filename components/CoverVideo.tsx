import React from "react";
import styled from "styled-components/native";
// npm i --save-dev @types/react-native-video
// import Video from "react-native-video";

import YouTube from "react-native-youtube";

import { makeVideoPath } from "../utils";
import { StyleSheet } from "react-native";

const YOUTUBE_API_KEY = "AIzaSyAubgzQNI2YF5pLw2f40nIzAWxgN2Y5n_g";
interface CoverVideoProps {
  path: string;
}

const CoverVideo: React.FC<CoverVideoProps> = ({ path }) => {
  console.log("CoverVideo 13번: ", makeVideoPath(path));

  return (
    <YouTube apiKey={YOUTUBE_API_KEY} style={StyleSheet.absoluteFill} play />
  );
};

export default CoverVideo;
