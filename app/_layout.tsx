import {SplashScreen, Stack} from "expo-router";
import "./global.css";
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    QuicksandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
    QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemiBold: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    QuicksandLight: require("../assets/fonts/Quicksand-Light.ttf"),
    QuicksandMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
  });
  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // ⬇️ Don’t render the app until the fonts are ready
  if (!fontsLoaded) return null;
  return <Stack screenOptions={{headerShown: false}} />;
}
