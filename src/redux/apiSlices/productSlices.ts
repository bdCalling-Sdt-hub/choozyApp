import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserProducts: builder.query({
      query: () => ({
        url: `/userproducts`,
      }),
      providesTags: ['product'],
    }),
    createProduct: builder.mutation({
      query: data => ({
        url: `/products`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['product'],
    }),
    updateProduct: builder.mutation({
      query: data => ({
        url: `/products/${data.id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['product'],
    }),
    deleteProduct: builder.mutation({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {useCreateProductMutation, useUpdateProductMutation} = authSlice;
