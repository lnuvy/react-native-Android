import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  return (
    <Container>
      <Swiper containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
        <View style={{ backgroundColor: "red"}}></View>
        <View style={{ backgroundColor: "blue"}}></View>
        <View style={{ backgroundColor: "cyan"}}></View>
        <View style={{ backgroundColor: "tomato"}}></View>
        <View style={{ backgroundColor: "black"}}></View>
      </Swiper>
    </Container>
  )
}

export default Movies;