import {api} from '../api/baseApi';
import {INewpaperList} from '../interface/newpaper';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserNewFeet: builder.query({
      query: () => ({
        url: `/usernewsfeeds`,
      }),
      providesTags: ['news_feed', 'comment'],
    }),
    getComment: builder.query({
      query: id => ({
        url: `/get-comment/${id}`,
      }),
      providesTags: ['comment'],
    }),
    getAllNewFeet: builder.query<INewpaperList, any>({
      query: () => ({
        url: `/newsfeeds`,
      }),
      providesTags: ['news_feed', 'comment'],
    }),
    createNewFeet: builder.mutation({
      query: data => ({
        url: `/newsfeeds`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['news_feed'],
    }),
    likeUnlike: builder.mutation({
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
      invalidatesTags: ['comment'],
    }),
    updateNewsFeet: builder.mutation({
      query: ({data, id}) => ({
        url: `/updateNewsfeeds/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['news_feed'],
    }),
    deleteNewFeet: builder.mutation({
      query: id => ({
        url: `/newsfeeds/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['news_feed'],
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/commentDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comment'],
    }),
  }),
});

export const {
  useCreateNewFeetMutation,
  useDeleteNewFeetMutation,
  useGetAllNewFeetQuery,
  useGetUserNewFeetQuery,
  useUpdateNewsFeetMutation,
  useLikeUnlikeMutation,
  useCommentMutation,
  useGetCommentQuery,
  useLazyGetCommentQuery,
  useDeleteCommentMutation,
} = authSlice;
