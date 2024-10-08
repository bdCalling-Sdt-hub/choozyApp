import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    userFriendRequests: builder.query({
      query: () => ({
        url: `/user-friend-requests`,
      }),
      providesTags: ['friend'],
    }),
    userFriend: builder.query({
      query: () => ({
        url: `/user-friends`,
      }),
      providesTags: ['friend'],
    }),
    sendFriendRequest: builder.mutation({
      query: id => ({
        url: `/friend-request/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['friend'],
    }),
    sendFriendAccept: builder.mutation({
      query: id => ({
        url: `/accept-request/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['friend'],
    }),
    cancelRequest: builder.mutation({
      query: id => ({
        url: `/cancel-request/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['friend'],
    }),
    unfriend: builder.mutation({
      query: id => ({
        url: `/unfriend/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['friend'],
    }),
  }),
});

export const {
  useCancelRequestMutation,
  useSendFriendAcceptMutation,
  useSendFriendRequestMutation,
  useUserFriendQuery,
  useUserFriendRequestsQuery,
  useUnfriendMutation,
} = authSlice;
