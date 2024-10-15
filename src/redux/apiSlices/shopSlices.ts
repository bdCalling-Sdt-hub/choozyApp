import {api} from '../api/baseApi';
import {IShop} from '../interface/shop';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getShop: builder.query<IShop, any>({
      query: () => ({
        url: `shops`,
      }),
    }),
    createShop: builder.mutation({
      query: data => ({
        url: `/shops`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const {useCreateShopMutation, useUpdateShopMutation, useGetShopQuery} =
  authSlice;
