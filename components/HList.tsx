import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { fetchMore } from "../utils";

const ListContainer = styled.View`
  margin-bottom: 20px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor}
  font-size: 24px;
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
  hasNext: boolean | undefined;
  fetchNext: Function;
}

const HList: React.FC<HListProps> = ({ title, data, hasNext, fetchNext }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      onEndReached={() => fetchMore(hasNext, fetchNext)}
      onEndReachedThreshold={0.4} // Test
      horizontal
      showsHorizontalScrollIndicator={true}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;
