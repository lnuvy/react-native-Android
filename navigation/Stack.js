import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { BLACK_COLOR, YELLOW_COLOR } from "../colors";
import { useColorScheme } from "react-native";

const StackNavigator = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <StackNavigator.Navigator
      screenOptions={{
        presentation: "modal",
        animation: "slide_from_right",
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? YELLOW_COLOR : BLACK_COLOR,
        },
      }}
    >
      <StackNavigator.Screen name="Detail" component={Detail} />
    </StackNavigator.Navigator>
  );
};
export default Stack;
