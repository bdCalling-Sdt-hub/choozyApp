import {IFriends, IFriendsRequests, ISendRequests} from '../interface/Friends';

import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    userFriendRequests: builder.query<IFriendsRequests, unknown>({
      query: () => ({
        url: `/user-friend-requests`,
      }),
      providesTags: ['friend'],
    }),
    userSendFriendRequests: builder.query<ISendRequests, unknown>({
      query: () => ({
        url: `/get-send-friend-request`,
      }),
      providesTags: ['friend'],
    }),
    userFriend: builder.query<IFriends, unknown>({
      query: () => ({
        url: `/user-friends`,
      }),
      providesTags: ['friend'],
    }),
    sendFriendRequest: builder.mutation<any, any>({
      query: id => ({
        url: `/friend-request/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['friend'],
    }),
    acceptRequest: builder.mutation<any, any>({
      query: id => ({
        url: `/accept-request/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['friend'],
    }),
    cancelRequest: builder.mutation<any, any>({
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
  useAcceptRequestMutation,
  useSendFriendRequestMutation,
  useUserFriendQuery,
  useUserFriendRequestsQuery,
  useUnfriendMutation,
  useUserSendFriendRequestsQuery,
} = authSlice;
