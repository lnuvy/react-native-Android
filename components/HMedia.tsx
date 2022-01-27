import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const CommingMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  /* margin-bottom: 30px; */
`;

const CommingColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Title = styled.Text`
  color: black;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Overview = styled.Text`
  color: gray;
  width: 80%;
`;

const Release = styled.Text`
  color: black;
  font-size: 12px;
  margin-vertical: 10px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  const navigation = useNavigation();
  const go2Detail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
      },
    });
  };

  return (
    <TouchableOpacity onPress={go2Detail}>
      <CommingMovie>
        <Poster path={posterPath} />
        <CommingColumn>
          <Title>{originalTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== "" && overview.length > 150
              ? `${overview.slice(0, 150)}...`
              : overview}
          </Overview>
        </CommingColumn>
      </CommingMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
