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
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to Search</Text>
  </TouchableOpacity>
);

const StackNavigator = createNativeStackNavigator();

const Stack = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    >
      <StackNavigator.Screen name="One" component={ScreenOne} />
      <StackNavigator.Screen name="Two" component={ScreenTwo} />
      <StackNavigator.Screen name="Three" component={ScreenThree} />
    </StackNavigator.Navigator>
  );
};
export default Stack;
