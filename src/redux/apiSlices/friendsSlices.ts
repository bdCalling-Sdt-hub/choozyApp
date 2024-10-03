import {IFriendReceivedRequests, IFriends} from '../interface/friends';

import {api} from '../api/baseApi';
import {IInputPagination} from '../interface/additional';

export const friendSlices = api.injectEndpoints({
  endpoints: builder => ({
    getFriend: builder.query<IFriends, IInputPagination>({
      query: ({id, page, limit}) => ({
        url: `/friends`,
      }),
      providesTags: ['friend'],
    }),
    getSuggestions: builder.query<IFriends, IInputPagination>({
      query: ({id, page, limit}) => ({
        url: `/friends/suggestions`,
      }),
      providesTags: ['friend'],
    }),
    getFriendRequests: builder.query<null, IInputPagination>({
      query: ({id, page, limit}) => ({
        url: `/friends/requests/sent`,
      }),
      providesTags: ['friend'],
    }),
    getFriendReceivedRequests: builder.query<
      IFriendReceivedRequests,
      IInputPagination
    >({
      query: ({id, page, limit}) => ({
        url: `/friends/requests/received`,
      }),
      providesTags: ['friend'],
    }),
    sendFriendRequest: builder.mutation({
      query: data => ({
        url: `/friends/requests`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['friend'],
    }),
    acceptFriendRequest: builder.mutation({
      query: data => ({
        url: `/friends/requests/accept`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['friend'],
    }),
    cancelFriendRequest: builder.mutation({
      query: data => ({
        url: `/friends/requests/cancel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['friend'],
    }),
    removeFriendRequest: builder.mutation({
      query: data => ({
        url: `/friends/requests/remove`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['friend'],
    }),
  }),
});

export const {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendQuery,
  useGetFriendReceivedRequestsQuery,
  useGetFriendRequestsQuery,
  useRemoveFriendRequestMutation,
  useSendFriendRequestMutation,
  useGetSuggestionsQuery,
} = friendSlices;
