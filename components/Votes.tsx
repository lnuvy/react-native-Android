import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  font-size: 10px;
`;

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  return <Text>{votes > 0 ? `${votes}/10` : `Comming soon...`}</Text>;
};

export default Votes;
