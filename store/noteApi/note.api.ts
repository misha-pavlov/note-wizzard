import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import {
  GetAllUserNotesParams,
  GetNoteByIdParams,
  GetUserStatisticReturnType,
  NoteType,
  NoteTypeArrayWithPageInfo,
} from "../../dataTypes/note.types";

export const noteApi = createApi({
  // reducerPath - name your current file
  reducerPath: "note.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/note",
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
    createNote: builder.mutation<NoteType, void>({
      query: () => ({
        url: "create",
        method: "POST",
      }),
    }),
    // GET
    getAllUserNotes: builder.query<
      NoteTypeArrayWithPageInfo,
      GetAllUserNotesParams
    >({
      query: ({ isImportant, page, onlyWithoutFolder }) => ({
        url: "getAllUserNotes",
        method: "GET",
        params: {
          page,
          isImportant,
          onlyWithoutFolder,
        },
      }),
    }),
    getNoteById: builder.query<NoteType, GetNoteByIdParams>({
      query: ({ noteId }) => ({
        url: "getNoteById",
        method: "GET",
        params: {
          noteId,
        },
      }),
    }),
    getUserStatistic: builder.query<GetUserStatisticReturnType, void>({
      query: () => ({
        url: "getUserStatistic",
        method: "GET",
      }),
    }),
  }),
});

export const {
  // POST
  useCreateNoteMutation,
  // GET
  useGetAllUserNotesQuery,
  useGetNoteByIdQuery,
  useGetUserStatisticQuery
} = noteApi;
