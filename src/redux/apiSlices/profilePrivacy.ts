import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    privacyPrivate: builder.mutation({
      query: data => ({
        url: `/privacy-private`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    privacyFriend: builder.mutation({
      query: data => ({
        url: `/privacy-friend`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    privacyPublic: builder.mutation({
      query: data => ({
        url: `/privacyPublic`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  usePrivacyFriendMutation,
  usePrivacyPrivateMutation,
  usePrivacyPublicMutation,
} = authSlice;
