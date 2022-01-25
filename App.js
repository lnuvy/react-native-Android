import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";

export default function App() {
  const [assets] = useAssets([require("./picture.jpg")]);
  const [loaded] = useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    // 사용하려면 반드시 임포트 필요
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
