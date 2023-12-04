import * as Font from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { ColorMode, NativeBaseProvider, extendTheme } from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { constants } from "../config/constants";
import { Provider } from "../context/auth";
import { StatusBar } from "../components";
import { store } from "../store";

const fonts = constants.fonts;
const colors = {
  noteWizard: {
    light: {
      main: "#FBF5FF",
      purple: "#8614CC",
      purple2: "#AF82F8",
      second: "#F3EAFA",
      gray: "#A3A3A3",
      background: "#F2F2F2",
      white: "#F0F0F0",
      red: "#EF6262",
      font: "#211B27",
    },
    dark: {
      main: "#211B27",
      purple: "#A260CC",
      purple2: "#A587A0",
      second: "#3A2849",
      gray: "#A3A3A3",
      background: "#131313",
      white: "#F0F0F0",
      red: "#EF6262",
      font: "#FBF5FF",
    },
  },
};

// Prevent hiding the splash screen
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  // TODO: CHANGE "null" TO null WHEN WILL DO RELEASE
  const [token, setToken] = useState<string | null>("null");
  // Load the fonts
  useEffect(() => {
    Font.loadAsync(fonts);
    AsyncStorage.getItem(constants.localStorageKeys.token).then((asyncToken) =>
      setToken(asyncToken)
    );
  }, []);

  // Get the fonts
  const [fontsLoaded] = Font.useFonts(fonts);
  const colorScheme = useColorScheme();

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
      initialColorMode: colorScheme || constants.theme.light,
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

  // TODO: ADD A POSSIBILITY TO REMOVE NOTE/FOLDER FROM LIST
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <StoreProvider store={store}>
        <StatusBar />
        <Provider token={token}>
          <Slot />
        </Provider>
      </StoreProvider>
    </NativeBaseProvider>
  );
};

export default Layout;
