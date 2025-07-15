import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";

const _Layout = () => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Redirect href={"/"} />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className={"bg-white h-full"}
        keyboardShouldPersistTaps={"handled"}
      >
        <View
          className={"h-full relative"}
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className={"size-full rounded-b-lg"}
            resizeMode={"stretch"}
          />
          <Image
            source={images.logo}
            className={"absolute self-center size-48 -bottom-16 z-10"}
            resizeMode={"contain"}
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default _Layout;
