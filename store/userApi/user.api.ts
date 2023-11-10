import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../config/constants";
import {
  ResetPasswordParams,
  SendVerificationCodeParams,
  SignInParams,
  SignUpParams,
  UpdateUserProfileParams,
  UserType,
} from "../../dataTypes/user.types";

export const userApi = createApi({
  // reducerPath - name your current file
  reducerPath: "user.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user",
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
    signUp: builder.mutation<UserType, SignUpParams>({
      query: ({ firstName, lastName, phone, password, email, withGoogle }) => ({
        url: "signup",
        method: "POST",
        body: {
          firstName,
          lastName,
          phone,
          password,
          email,
          withGoogle,
        },
      }),
    }),
    signIn: builder.mutation<UserType, SignInParams>({
      query: ({ phone, password, withGoogle, email }) => ({
        url: "signin",
        method: "POST",
        body: {
          email,
          phone,
          password,
          withGoogle,
        },
      }),
    }),
    sendVerificationCode: builder.mutation<
      UserType,
      SendVerificationCodeParams
    >({
      query: ({ phone, verificationCode }) => ({
        url: "sendVerificationCode",
        method: "POST",
        body: {
          phone,
          verificationCode,
        },
      }),
    }),
    resetPassword: builder.mutation<UserType, ResetPasswordParams>({
      query: ({ phone, newPassword }) => ({
        url: "resetPassword",
        method: "POST",
        body: {
          phone,
          newPassword,
        },
      }),
    }),
    updateUserProfile: builder.mutation<UserType, UpdateUserProfileParams>({
      query: ({
        firstName,
        lastName,
        email,
        phone,
        birthday,
        password,
        oldPassword,
        image,
      }) => ({
        url: "updateUserProfile",
        method: "POST",
        body: {
          firstName,
          lastName,
          email,
          phone,
          birthday,
          password,
          oldPassword,
          image,
        },
      }),
    }),

    // GET
    currentUser: builder.query<UserType, void>({
      query: () => ({
        url: "currentUser",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<UserType[], void>({
      query: () => ({
        url: "getAllUsers",
        method: "GET",
      }),
    }),
  }),
});

export const {
  // POST
  useSignUpMutation,
  useSignInMutation,
  useSendVerificationCodeMutation,
  useResetPasswordMutation,
  useUpdateUserProfileMutation,
  // GET
  useCurrentUserQuery,
  useGetAllUsersQuery,
} = userApi;
