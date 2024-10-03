import { api } from "../api/baseApi";
import { IFetchStatus } from "../interface/main";
import { IUser } from "../interface/user";

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<IUser,unknown>({
            query: token => ({
                url : `/users/profile`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }),
            providesTags : ["user"]
          }),
   loginUser : builder.mutation({
            query: (data) => ({
              url : `/auth/login`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
   createUser: builder.mutation({
            query: (data) => ({
              url: `/users/create-user`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
   verifyUser: builder.mutation({
            query: (data) => ({
              url: `/auth/verify-otp`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
   userUpdate: builder.mutation<IFetchStatus, any>({
            query: (data) => ({
              url: `/users/update-profile`,
              method: 'PATCH',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
        sendCodeAgain: builder.mutation({
            query: (data) => ({
              url: `/auth/resend-email`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
    })
});

export const {
  useGetUserProfileQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
  useSendCodeAgainMutation,
  useUserUpdateMutation
} = authSlice;