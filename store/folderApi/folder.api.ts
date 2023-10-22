import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import {
  CreateParams,
  FolderType,
  FolderTypeArrayWithPageInfo,
  GetFoldersForUserParams,
} from "../../dataTypes/folder.types";

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
      query: ({ title, iconType, noteIds, color }) => ({
        url: "create",
        method: "POST",
        body: {
          title,
          color,
          iconType,
          noteIds,
        },
      }),
    }),
    // GET
    getFoldersForUser: builder.query<
      FolderTypeArrayWithPageInfo,
      GetFoldersForUserParams
    >({
      query: ({ page }) => ({
        url: "getFoldersForUser",
        method: "GET",
        params: {
          page,
        },
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
