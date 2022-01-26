import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";

const API_KEY = "71f43de951c136a669bee61f1fbf4c5b";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);

  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color="#999999" size={24} />
    </Loader>
  ) : (
    <Container>
      <Swiper
        controlsEnabled={false}
        loop
        timeout={3}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "cyan" }}></View>
        <View style={{ backgroundColor: "tomato" }}></View>
        <View style={{ backgroundColor: "black" }}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;
