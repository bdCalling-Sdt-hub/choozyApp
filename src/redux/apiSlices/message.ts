import {IMessages, IUserChats} from '../interface/message';

import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserChats: builder.query<IUserChats, any>({
      query: id => ({
        url: `/user-chat`,
      }),
      providesTags: ['message'],
    }),
    getMassages: builder.query<IMessages, any>({
      query: id => ({
        url: `/getMessage?receiver_id=${id}`,
      }),
      providesTags: ['message'],
    }),
    sendMessage: builder.mutation({
      query: data => ({
        url: `/messageSend`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['message'],
    }),

    deleteMessage: builder.mutation({
      query: id => ({
        url: `/deleteMessage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['message'],
    }),
  }),
});

export const {
  useDeleteMessageMutation,
  useGetMassagesQuery,
  useSendMessageMutation,
  useGetUserChatsQuery,
  useLazyGetMassagesQuery,
  useLazyGetUserChatsQuery,
  usePrefetch: useMessageRefetch,
} = authSlice;
