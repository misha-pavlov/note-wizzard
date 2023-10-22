import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import {
  GetAllUserNotesParams,
  GetNoteByIdParams,
  NoteType,
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
    getAllUserNotes: builder.query<NoteType[], GetAllUserNotesParams>({
      query: ({ isImportant }) => ({
        url: "getAllUserNotes",
        method: "GET",
        params: {
          isImportant,
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
  }),
});

export const {
  // POST
  useCreateNoteMutation,
  // GET
  useGetAllUserNotesQuery,
  useGetNoteByIdQuery,
} = noteApi;
