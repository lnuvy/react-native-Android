import React from "react";
import styled from "styled-components/native";

const ListContainer = styled.View`
  margin-bottom: 40px;
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
}

const HList: React.FC<HListProps> = ({ title, children }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    {children}
  </ListContainer>
);

export default HList;
