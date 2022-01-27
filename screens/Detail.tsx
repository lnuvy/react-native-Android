import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
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

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Headview>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["red", "blue", "yellow"]}
          style={StyleSheet.absoluteFill}
        />
        <Poster path={params.poster_path || ""} />
      </Headview>
    </Container>
  );
};

export default Detail;
