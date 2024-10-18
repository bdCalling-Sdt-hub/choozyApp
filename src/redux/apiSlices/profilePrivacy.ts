import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    privacyPrivate: builder.mutation({
      query: () => ({
        url: `/privacy-private`,
        method: 'POST',
      }),
      invalidatesTags: ['user'],
    }),
    privacyFriend: builder.mutation({
      query: () => ({
        url: `/privacy-friend`,
        method: 'POST',
      }),
      invalidatesTags: ['user'],
    }),
    privacyPublic: builder.mutation({
      query: () => ({
        url: `/privacy-public`,
        method: 'POST',
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
