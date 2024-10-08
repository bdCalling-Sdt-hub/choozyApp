import {api} from '../api/baseApi';

const additionalSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: token => ({
        url: `/userProfile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    verifyUser: builder.mutation({
      query: data => ({
        url: `/verifyOtp`,
        method: 'POST',
        body: data,
      }),
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
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: `/resetPassword`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updatePassword: builder.mutation({
      query: data => ({
        url: `/updatePassword`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
  useUserUpdateMutation,
} = additionalSlice;
