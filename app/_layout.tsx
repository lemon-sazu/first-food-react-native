import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import { Text } from "react-native";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, fontError] = useFonts({
    QuicksandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
    QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemiBold: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    QuicksandLight: require("../assets/fonts/Quicksand-Light.ttf"),
    QuicksandMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // 👇 Handle font load error gracefully
  if (fontError) {
    return <Text>Error loading fonts: {fontError.message}</Text>;
  }

  // 👇 Wait until fonts and user are loaded
  if (!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
