import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesAPI, TV, tvAPI } from "../api";
import { BLACK_COLOR, GRAY_COLOR } from "../colors";
import CoverVideo from "../components/CoverVideo";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Headview = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 35px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity``;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
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

  console.log("디테일 77번: ", data?.videos?.results[0]?.key);

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
  return (
    <Container>
      <Headview>
        {isLoading ? (
          <Background
            source={{ uri: makeImgPath(params.backdrop_path || "") }}
          />
        ) : (
          <CoverVideo path={data?.videos?.results[0]?.key || ""} />
        )}
        <LinearGradient
          colors={
            isDark ? ["transparent", GRAY_COLOR] : ["transparent", "white"]
          }
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Headview>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key}>
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
