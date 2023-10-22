import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi/user.api";
import { noteApi } from "./noteApi/note.api";
import { folderApi } from "./folderApi/folder.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      noteApi.middleware,
      folderApi.middleware
    ),
});
