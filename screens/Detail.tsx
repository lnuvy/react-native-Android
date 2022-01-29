import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useEffect } from "react";
import { Dimensions, Linking, StyleSheet, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesAPI, TV, tvAPI } from "../api";
import { BLACK_COLOR, GRAY_COLOR } from "../colors";
import CoverVideo from "../components/CoverVideo";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { makeImgPath, makeVideoPath } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import DetailHeader from "../components/DetailHeader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 20px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  // console.log("디테일 77번: ", data?.videos?.results[0]?.key);

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  const openYouTube = async (videoId: string) => {
    const url = makeVideoPath(videoId);
    // await Linking.openURL(url); // 유튜브 앱으로 열기
    await WebBrowser.openBrowserAsync(url); // expo-web-browser 앱 내부에서 열기 (ios 만 되는거같음)
  };

  return (
    <Container>
      <DetailHeader
        title={
          "original_title" in params
            ? params.original_title
            : params.original_name
        }
        posterPath={params.poster_path || ""}
        backDrop={params.backdrop_path || ""}
      />
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYouTube(video.key)}>
            <Ionicons name="logo-youtube" color="red" size={20} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
