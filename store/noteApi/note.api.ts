import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import {
  GetAllUserNotesParams,
  GetNoteByIdParams,
  GetNotesByIdsParams,
  GetUserStatisticReturnType,
  NoteType,
  NoteTypeArrayWithPageInfo,
  SearchNotesAndFoldersParams,
  SearchNotesAndFoldersReturnType,
  SpeechToTextParams,
  SpeechToTextReturnType,
  UpdateNoteParams,
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
    searchNotesAndFoldersReq: builder.query<
      SearchNotesAndFoldersReturnType,
      SearchNotesAndFoldersParams
    >({
      query: ({ searchTerm }) => ({
        url: "searchNotesAndFolders",
        method: "GET",
        params: {
          searchTerm,
        },
      }),
    }),
    getNotesByIds: builder.query<NoteType[], GetNotesByIdsParams>({
      query: ({ noteIds }) => ({
        url: "getNotesByIds",
        method: "GET",
        params: { noteIds },
      }),
    }),
    speechToText: builder.query<SpeechToTextReturnType, SpeechToTextParams>({
      query: ({ uri }) => ({
        url: "speechToText",
        method: "GET",
        params: { uri },
      }),
    }),

    // PATCH
    updateNote: builder.mutation<NoteType, UpdateNoteParams>({
      query: ({
        noteId,
        content,
        name,
        privacy,
        recorders,
        reminder,
        sharedWith,
        title,
        folderId,
        isImportant,
      }) => ({
        url: "update",
        method: "PATCH",
        body: {
          noteId,
          content,
          name,
          privacy,
          recorders,
          reminder,
          sharedWith,
          title,
          folderId,
          isImportant,
        },
      }),
    }),

    // DELETE
    deleteNoteById: builder.mutation<NoteType, GetNoteByIdParams>({
      query: ({ noteId }) => ({
        url: "deleteNoteById",
        method: "DELETE",
        body: {
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
  useGetUserStatisticQuery,
  useSearchNotesAndFoldersReqQuery,
  useGetNotesByIdsQuery,
  useLazySpeechToTextQuery,
  // PATCH
  useUpdateNoteMutation,
  //DELETE
  useDeleteNoteByIdMutation,
} = noteApi;
