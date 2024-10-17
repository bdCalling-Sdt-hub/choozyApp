import {IProfile, IUserProfile, ValidToken} from '../interface/auth';

import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    tokenCheck: builder.query<ValidToken, any>({
      query: token => ({
        url: `/validate-token`,
      }),
      providesTags: ['user'],
    }),
    getProfile: builder.query<IProfile, any>({
      query: token => ({
        url: `/getProfile`,
      }),
      providesTags: ['user'],
    }),
    getUserProfile: builder.query<IUserProfile, any>({
      query: token => ({
        url: `/userProfile`,
      }),
      providesTags: ['user'],
    }),
    getOtherUserProfile: builder.query<IUserProfile, any>({
      query: id => ({
        url: `/anotherUserProfile/${id}`,
      }),
      providesTags: ['user'],
    }),
    loginUser: builder.mutation({
      query: data => ({
        url: `/login`,
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['user'],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['user'],
    }),
    createUser: builder.mutation({
      query: data => ({
        url: `/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    verifyEmail: builder.mutation({
      query: data => ({
        url: `/verifyOtp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    userUpdate: builder.mutation({
      query: data => ({
        url: `/profile`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: `/forgotPassword`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: `/resetPassword`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    resendOtp: builder.mutation({
      query: data => ({
        url: `/resendOtp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useTokenCheckQuery,
  useLazyTokenCheckQuery,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useGetOtherUserProfileQuery,
  useGetUserProfileQuery,
  useLogOutUserMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
  useUserUpdateMutation,
  useVerifyEmailMutation,
  useGetProfileQuery,
} = authSlice;
