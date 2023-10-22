import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import { CreateParams, FolderType } from "../../dataTypes/folder.types";

export const folderApi = createApi({
  // reducerPath - name your current file
  reducerPath: "folder.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/folder",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem(
        constants.localStorageKeys.token
      );

      if (token) {
        headers.set("x-access-token", token);
      }
    },
  }),
  endpoints: (builder) => ({
    // POST
    createFolder: builder.mutation<FolderType, CreateParams>({
      query: ({ title, iconType, noteIds }) => ({
        url: "create",
        method: "POST",
        body: {
          title,
          iconType,
          noteIds,
        },
      }),
    }),
    // GET
    getFoldersForUser: builder.query<FolderType[], void>({
      query: () => ({
        url: "getFoldersForUser",
        method: "GET",
      }),
    }),
  }),
});

export const {
  // POST
  useCreateFolderMutation,
  // GET
  useGetFoldersForUserQuery,
} = folderApi;
