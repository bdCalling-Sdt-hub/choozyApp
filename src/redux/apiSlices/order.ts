import {IOrders} from '../interface/order';
import {api} from '../api/baseApi';

const orderSlice = api.injectEndpoints({
  endpoints: builder => ({
    //============= buyer order part start================
    getUserOrders: builder.query<IOrders, any>({
      query: () => ({
        url: `/get-user-order`,
      }),
      providesTags: ['order'],
    }),
    createOrder: builder.mutation<any, any>({
      query: data => ({
        url: `/order`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    cancelOrder: builder.mutation<any, any>({
      query: data => ({
        url: `/cancel-order`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    acceptDelivery: builder.mutation<any, any>({
      query: data => ({
        url: `/accept-delivery`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    rejectDelivery: builder.mutation<any, any>({
      query: data => ({
        url: `/reject-delivery`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),

    //============= buyer order part end================
    //============= seller order part start================
    getSellerOrders: builder.query<IOrders, any>({
      query: () => ({
        url: `/get-seller-order`,
      }),
      providesTags: ['order'],
    }),
    acceptOrder: builder.mutation<any, any>({
      query: data => ({
        url: `/accept-order`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    requestDelivery: builder.mutation<any, any>({
      query: data => ({
        url: `/delivery-request`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    //============= seller order part end================
  }),
});

export const {
  useAcceptDeliveryMutation,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCreateOrderMutation,
  useRejectDeliveryMutation,
  useRequestDeliveryMutation,
  useGetSellerOrdersQuery,
  useGetUserOrdersQuery,
  useLazyGetSellerOrdersQuery,
  useLazyGetUserOrdersQuery,
} = orderSlice;
