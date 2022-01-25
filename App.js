import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    // url을 인자로 갖고있으면 (서버 등의 외부에서 가져올때)
    if (typeof image === "string") {
      return Image.prefetch(image);
      // 프로젝트 내부에 있으면
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./picture.jpg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    //                 두개의 배열을 합치기
    await Promise.all(...fonts, ...images);
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
