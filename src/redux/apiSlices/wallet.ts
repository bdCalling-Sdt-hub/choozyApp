import {api} from '../api/baseApi';
import {IMyRequest} from '../interface/wallet';

const walletSlice = api.injectEndpoints({
  endpoints: builder => ({
    getMyRequest: builder.query<IMyRequest, any>({
      query: () => ({
        url: `/my-request`,
      }),
      providesTags: ['wallet'],
    }),
    loveRequest: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/request-love`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['wallet'],
    }),
    acceptLoveRequest: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/accept-request-love/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
    rejectLoveRequest: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/reject-request-love/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
    loveTransfer: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `/transger-love`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
  }),
});

export const {
  useAcceptLoveRequestMutation,
  useGetMyRequestQuery,
  useLoveRequestMutation,
  useRejectLoveRequestMutation,
  useLoveTransferMutation,
} = walletSlice;
