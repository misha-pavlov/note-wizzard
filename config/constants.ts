import { ColorMode } from "native-base";
import { RNSensitiveInfoAttrAccessibleOptions } from "react-native-sensitive-info";

export const constants = {
  keys: {
    theme: "theme",
    options: {
      kSecAttrAccessible:
        "kSecAttrAccessibleWhenUnlockedThisDeviceOnly" as RNSensitiveInfoAttrAccessibleOptions,
    },
  },

  theme: {
    dark: "dark" as ColorMode,
    light: "light" as ColorMode,
  },

  fonts: {
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  },
};
