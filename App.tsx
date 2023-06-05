import * as Font from "expo-font";
import { ColorMode, NativeBaseProvider, extendTheme } from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { constants } from "./config/constants";
import RootNavigator from "./navigation/RootNavigator";

const colors = {
  noteWizard: {
    light: {
      main: "#FBF5FF",
      purple: "#8614CC",
      purple2: "#D9C1FF",
      second: "#FBF5FF",
    },
    dark: {
      main: "#211B27",
      purple: "#A260CC",
      purple2: "#A587A0",
      second: "#3A2849",
    },
  },
};

const fonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

const App = () => {
  // load fonts
  useEffect(() => {
    Font.loadAsync(fonts);
  }, []);

  // get fonts
  const [fontsLoaded] = Font.useFonts(fonts);

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
      <RootNavigator />
    </NativeBaseProvider>
  );
};

export default App;
