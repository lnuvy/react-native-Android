import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";

const Container = styled.ScrollView`
  /* background-color: black; */
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

// styled-components 를 이용한 FlatList 타입스크립트 적용법
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const QueryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    isRefetching: isRefetchingUpComing,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "upComing"], moviesAPI.upComing);

  const onRefresh = async () => {
    QueryClient.refetchQueries(["movies"]);
  };

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;

  // JS 꿀팁
  // console.log(Object.keys(nowPlayingData?.results[0]));
  // console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v));

  return loading ? (
    <Loader>
      <ActivityIndicator color="#999999" size={24} />
    </Loader>
  ) : upComingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            controlsEnabled={false}
            loop
            timeout={5}
            containerStyle={{
              marginBottom: 20,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                contentContainerStyle={{
                  paddingHorizontal: 20,
                }}
                keyExtractor={(item) => item.id + ""}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingData.results}
                ItemSeparatorComponent={() => <VSeparator />}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer>
          <CommingSoonTitle>Comming Soon...</CommingSoonTitle>
        </>
      }
      data={upComingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};
export default Movies;
