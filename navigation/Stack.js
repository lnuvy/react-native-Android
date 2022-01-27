import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";

const StackNavigator = createNativeStackNavigator();

const Stack = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    >
      <StackNavigator.Screen name="Detail" component={Detail} />
    </StackNavigator.Navigator>
  );
};
export default Stack;
