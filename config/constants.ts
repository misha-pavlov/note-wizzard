export const constants = {
  keys: {
    theme: "theme",
  },

  theme: {
    dark: "dark" as "dark",
    light: "light" as "light",
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
    // home screens
    note: "/home/note",
    recording: "/home/recording",
    // profile screens
    editProfile: "/profile/editProfile",
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
    profile: "profile",
    settings: "settings",
    // home screens
    folderNotes: "folderNotes",
    note: "note",
    recording: "recording",
    // profile screens
    editProfile: "editProfile",
    // indexes
    homeIndex: "homeIndex",
    settingsIndex: "settingsIndex",
    profileIndex: "profileIndex",
  },

  localStorageKeys: {
    token: "TOKEN",
    sortType: "sortType",
  },

  sortTypes: {
    squares: "squares",
    rows: "rows",
  },

  thisNoteWithoutContent: "This note without content",

  folderTypesList: [
    "Personal Goals",
    "To-Do",
    "Job",
    "Meetings",
    "Financial",
    "Health",
    "Travel",
    "Books",
    "Inspiration",
    "Learning",
    "Home",
    "Gifts",
    "Brainstorming",
    "Events",
    "Movies",
    "Hobbies",
  ],

  emptyLists: {
    note: `You don't have any notes`,
    folder: `You don't have any folders`,
  },
};
