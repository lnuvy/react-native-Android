import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "react-query";
import { MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { fetchMore } from "../utils";

const Container = styled.FlatList`
  /* background-color: black; */
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const ListTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const CommingSoonTitle = styled(ListTitle)`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 30px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    hasNextPage: hasUpComingNext,
    fetchNextPage: upComingFetchNext,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upComing"],
    moviesAPI.upComing,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        if (nextPage > currentPage.total_pages) {
          return null;
        } else {
          return nextPage;
        }
      },
    }
  );

  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: hasTrendingNext,
    fetchNextPage: trendingFetchNext,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "trending"],
    moviesAPI.trending,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : upComingData ? (
    <Container
      // 인피니티 스크롤 리액트네이티브 프롭
      onEndReached={() => fetchMore(hasUpComingNext, upComingFetchNext)}
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
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList
              title="Trending Movies"
              data={trendingData?.pages.map((page) => page.results).flat()}
              hasNext={hasTrendingNext}
              fetchNext={trendingFetchNext}
            />
          ) : null}
          <CommingSoonTitle>Comming Soon...</CommingSoonTitle>
        </>
      }
      //useInfinityQuery 사용하기
      data={upComingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};
export default Movies;
