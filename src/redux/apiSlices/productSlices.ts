import {ICategories, IProducts} from '../interface/products';

import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserProducts: builder.query<IProducts, any>({
      query: () => ({
        url: `/userproducts`,
      }),
      providesTags: ['product'],
    }),
    getCategories: builder.query<ICategories, any>({
      query: () => ({
        url: `/categories`,
      }),
      providesTags: ['product'],
    }),
    createProduct: builder.mutation({
      query: data => ({
        url: `/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['product', 'user'],
    }),
    updateProduct: builder.mutation({
      query: ({data, id}) => ({
        url: `/products/${id}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetUserProductsQuery,
  useGetCategoriesQuery,
  useDeleteProductMutation,
} = authSlice;
