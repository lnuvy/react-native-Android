import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={styles.btn}
  >
    <Text>Movies</Text>
  </Btn>
);

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "blue",
  },
});

export default Movies;
