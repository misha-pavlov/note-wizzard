import { ColorMode } from "native-base";

export const constants = {
  keys: {
    theme: "theme",
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

  routes: {
    // auth
    signUp: "/sign-up",
    signIn: "/sign-in",
    forgotPassword: "/forgot-password",
    verification: "/verification",
    newPassword: "/new-password",
    // logged in user
    home: "/home",
    newNote: "/new-note",
    profile: "/profile",
    settings: "/settings",
  },

  screens: {
    // auth
    signUp: "sign-up",
    signIn: "sign-in",
    forgotPassword: "forgot-password",
    verification: "verification",
    newPassword: "new-password",
    // logged in user
    home: "home",
    newNote: "new-note",
    profile: "profile",
    settings: "settings",
  },
};
