import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserNewFeet: builder.query({
      query: () => ({
        url: `/usernewsfeeds`,
      }),
      providesTags: ['news_feed'],
    }),
    commentView: builder.query({
      query: id => ({
        url: `/commentView/${id}`,
      }),
      providesTags: ['news_feed'],
    }),
    getAllNewFeet: builder.query({
      query: () => ({
        url: `/newsfeeds`,
      }),
      providesTags: ['news_feed'],
    }),
    createNewFeet: builder.mutation({
      query: data => ({
        url: `/newsfeeds`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['news_feed'],
    }),
    lineUnlike: builder.mutation({
      query: data => ({
        url: `/like-newsfeed`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['news_feed'],
    }),
    comment: builder.mutation({
      query: data => ({
        url: `/comment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['news_feed'],
    }),
    updateNewsFeet: builder.mutation({
      query: id => ({
        url: `/updateNewsfeeds/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['friend'],
    }),
    deleteNewFeet: builder.mutation({
      query: id => ({
        url: `/newsfeeds/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['friend'],
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/commentDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['friend'],
    }),
  }),
});

export const {
  useCreateNewFeetMutation,
  useDeleteNewFeetMutation,
  useGetAllNewFeetQuery,
  useGetUserNewFeetQuery,
  useUpdateNewsFeetMutation,
} = authSlice;
