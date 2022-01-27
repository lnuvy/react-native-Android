import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image, useColorScheme, LogBox } from "react-native";
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
import { QueryClient, QueryClientProvider } from "react-query";

// 새로고침시 Setting a timer for a long period of time .... 노란 에러 안보이게하기
LogBox.ignoreLogs(["Setting a timer"]);

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./picture.jpg")]);
  const [loaded] = useFonts(Ionicons.font);

  const isDark = useColorScheme() !== "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
