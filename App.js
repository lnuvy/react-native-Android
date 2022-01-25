import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const [assets, error] = useAssets([
    require("./picture.jpg"),
    require("./down2.jpg"),
  ]);

  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
    await await Image.prefetch("https://reactnative.dev/img/oss_logo.png");
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.log}
      />
    );
  }
  return <Text>We are done Loading!</Text>;
}
