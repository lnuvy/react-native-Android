import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { useState } from "react";
import { useQuery } from "react-query";
import { moviesAPI, tvAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { YELLOW_COLOR } from "../colors";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: ${(props) => props.theme.inputBar};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
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
          placeholderTextColor={YELLOW_COLOR}
          returnKeyType="search"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      ) : (
        <SearchBar
          placeholder="Search for Media..."
          placeholderTextColor={YELLOW_COLOR}
          returnKeyLabel="검색"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      )}
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};
export default Search;
