import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi/user.api";
import { noteApi } from "./noteApi/note.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, noteApi.middleware),
});
