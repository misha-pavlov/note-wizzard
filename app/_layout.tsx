import * as Font from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { ColorMode, NativeBaseProvider, extendTheme } from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../config/constants";
import { Provider } from "../context/auth";

const fonts = constants.fonts;
const colors = {
  noteWizard: {
    light: {
      main: "#FBF5FF",
      purple: "#8614CC",
      purple2: "#D9C1FF",
      second: "#FBF5FF",
      gray: "#A3A3A3",
    },
    dark: {
      main: "#211B27",
      purple: "#A260CC",
      purple2: "#A587A0",
      second: "#3A2849",
      gray: "#A3A3A3",
    },
  },
};

// Prevent hiding the splash screen
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  // Load the fonts
  useEffect(() => {
    Font.loadAsync(fonts);
    console.log("GGG");
  }, []);

  // Get the fonts
  const [fontsLoaded] = Font.useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) {
    return null;
  }

  const theme = extendTheme({
    colors,
    config: {
      initialColorMode: constants.theme.light,
    },
    fontConfig: {
      Roboto: {
        400: {
          normal: "Roboto-Regular",
        },
        500: {
          normal: "Roboto-Medium",
        },
        700: {
          normal: "Roboto-Bold",
        },
      },
    },
    fonts: {
      heading: "Roboto",
      body: "Roboto",
      mono: "Roboto",
    },
  });

  const colorModeManager: StorageManager = {
    get: async (init) => {
      try {
        const { keys, theme } = constants;
        const currentTheme = await AsyncStorage.getItem(keys.theme);
        return currentTheme === theme.dark ? theme.dark : theme.light;
      } catch (e) {
        console.error(e);
        return init;
      }
    },
    set: async (value: ColorMode) => {
      try {
        const { keys } = constants;
        if (value) {
          await AsyncStorage.setItem(keys.theme, value);
        }
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <Provider>
        <Slot />
      </Provider>
    </NativeBaseProvider>
  );
};

export default Layout;
