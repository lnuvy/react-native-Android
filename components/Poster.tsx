import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 140px;
  border-radius: 5px;
`;

const Test = styled.View`
  border: 1px solid blue;
`;
interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return (
    <Test>
      <Image source={{ uri: makeImgPath(path) }} />
    </Test>
  );
};

export default Poster;
