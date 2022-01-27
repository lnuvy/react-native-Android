import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { tvAPI } from "../api";
import HList, { HListSeparator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvAPI.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvAPI.trending
  );

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <HList title="Trending TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={trendingData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Airing TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={todayData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Top Rated TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={topData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
    </ScrollView>
  );
};

export default Tv;
