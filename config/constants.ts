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
};
