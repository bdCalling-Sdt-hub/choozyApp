import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getMassages: builder.query({
      query: id => ({
        url: `/messageView/${id}`,
      }),
      providesTags: ['message'],
    }),
    sendMessage: builder.mutation({
      query: data => ({
        url: `/messageSend`,
        method: 'POST',
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
} = authSlice;
