import {api} from '../api/baseApi';
import IPaymentTransactions from '../interface/payment';

const paymentSlice = api.injectEndpoints({
  endpoints: builder => ({
    getPaymentHistory: builder.query<IPaymentTransactions, any>({
      query: () => ({
        url: `/wallet-transger-histories`,
      }),
      providesTags: ['payment', 'wallet'],
    }),

    paymentIntent: builder.mutation<any, {message: string}>({
      query: data => ({
        url: `/stripe/payment-intent`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['additional'],
    }),
    confirmPayment: builder.mutation<any, {message: string}>({
      query: data => ({
        url: `/wallet-recharge`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['payment'],
    }),
  }),
});

export const {useGetPaymentHistoryQuery, usePaymentIntentMutation} =
  paymentSlice;
