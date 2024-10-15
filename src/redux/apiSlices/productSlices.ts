import {api} from '../api/baseApi';
import {IProducts} from '../interface/products';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getUserProducts: builder.query<IProducts, any>({
      query: () => ({
        url: `/userproducts`,
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

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetUserProductsQuery,
} = authSlice;
