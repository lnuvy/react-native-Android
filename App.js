import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

export default function App() {
  // 코드가 간결해지지만 Image.prefetch() 를 사용할 수 없음
  const [assets] = useAssets([require("./picture.jpg")]);
  const [loaded] = useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    // 사용하려면 반드시 임포트 필요
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
