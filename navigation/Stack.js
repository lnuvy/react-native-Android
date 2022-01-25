import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Go Back</Text>
  </TouchableOpacity>
);

const StackNavigator = createNativeStackNavigator();

const Stack = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="One" component={ScreenOne} />
      <StackNavigator.Screen name="Two" component={ScreenTwo} />
      <StackNavigator.Screen name="Three" component={ScreenThree} />
    </StackNavigator.Navigator>
  );
};
export default Stack;
