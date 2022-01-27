import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <View>
      <ActivityIndicator
        color="#999999"
        size={Platform.OS === "android" ? 24 : "small"}
      />
    </View>
  );
};

export default Loader;
