import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: data => ({
        url: `/shops`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shop'],
    }),
    updateShop: builder.mutation({
      query: data => ({
        url: `/shops/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['shop'],
    }),
  }),
});

export const {useCreatePostMutation, useUpdateShopMutation} = authSlice;
