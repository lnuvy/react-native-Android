import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 20px;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          // 유용한 ??
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;

// <ListContainer>
//             <ListTitle>Trending Movies</ListTitle>
//             {trendingData ? (
//               <TrendingScroll
//                 contentContainerStyle={{
//                   paddingHorizontal: 20,
//                 }}
//                 keyExtractor={(item) => item.id + ""}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 data={trendingData.results}
//                 ItemSeparatorComponent={() => <VSeparator />}
//                 renderItem={({ item }) => (
//                   <VMedia
//                     posterPath={item.poster_path || ""}
//                     originalTitle={item.original_title}
//                     voteAverage={item.vote_average}
//                   />
//                 )}
//               />
//             ) : null}
//           </ListContainer>
