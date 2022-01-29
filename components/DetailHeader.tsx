import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { GRAY_COLOR } from "../colors";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Headview = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image`
  height: 100%;
  position: absolute;
`;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 35px;
  align-self: flex-end;
  width: 75%;
  margin-left: 15px;
  font-weight: 500;
`;

interface DetailHeaderProps {
  title: string;
  posterPath: string;
  backDrop: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  posterPath,
  backDrop,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Headview>
      <Background
        source={{ uri: makeImgPath(backDrop || "") }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={isDark ? ["transparent", GRAY_COLOR] : ["transparent", "white"]}
        style={StyleSheet.absoluteFill}
      />
      <Column>
        <Poster path={makeImgPath(posterPath) || ""} />
        <Title>{title}</Title>
      </Column>
    </Headview>
  );
};

export default DetailHeader;
