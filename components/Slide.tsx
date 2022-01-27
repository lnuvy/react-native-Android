import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;

// Overview 의 속성을 모두 가져오게됨
const Votes = styled(Overview)`
  margin-top: 3px;
`;
interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() !== "dark";
  const navigation = useNavigation();
  const go2Detail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableWithoutFeedback onPress={go2Detail}>
      <View style={{ flex: 1 }}>
        <BgImg source={{ uri: makeImgPath(backdropPath) }} />
        <BlurView
          intensity={Platform.OS === "ios" ? 60 : 100}
          tint={"dark"}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              <Votes isDark={isDark}>{voteAverage}/10</Votes>
              <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
