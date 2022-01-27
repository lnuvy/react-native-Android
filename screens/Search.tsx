import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { useState } from "react";
import { useQuery } from "react-query";
import { moviesAPI, tvAPI } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesAPI.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvAPI.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => {
    setQuery(text);
    console.log(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    } else {
      searchMovies();
      searchTv();
    }
  };

  return (
    <Container>
      {Platform.OS === "ios" ? (
        <SearchBar
          placeholder="Search for Media..."
          placeholderTextColor="grey"
          returnKeyType="search"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      ) : (
        <SearchBar
          placeholder="Search for Media..."
          placeholderTextColor="grey"
          returnKeyLabel="검색"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      )}
    </Container>
  );
};
export default Search;
