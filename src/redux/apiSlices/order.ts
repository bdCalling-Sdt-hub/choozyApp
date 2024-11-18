import {api} from '../api/baseApi';
import {IOrders} from '../interface/order';

const orderSlice = api.injectEndpoints({
  endpoints: builder => ({
    //============= buyer order part start================
    getUserOrders: builder.query<IOrders, any>({
      query: () => ({
        url: `/get-user-order`,
      }),
      providesTags: ['wallet'],
    }),
    createOrder: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/order`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    cancelOrder: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/cancel-order`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    acceptDelivery: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/accept-delivery`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    rejectDelivery: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/reject-delivery`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),

    //============= buyer order part end================
    //============= seller order part start================
    getSellerOrders: builder.query<IOrders, any>({
      query: () => ({
        url: `/get-seller-order`,
      }),
      providesTags: ['wallet'],
    }),
    acceptOrder: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/accept-order`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    requestDelivery: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/delivery-request`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    //============= seller order part end================
  }),
});

export const {
  useAcceptDeliveryMutation,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetSellerOrdersQuery,
  useGetUserOrdersQuery,
  useLazyGetSellerOrdersQuery,
  useLazyGetUserOrdersQuery,
  useRejectDeliveryMutation,
  useRequestDeliveryMutation,
} = orderSlice;
