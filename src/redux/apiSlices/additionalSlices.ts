import {IFaqs, ITermsConditions} from '../interface/additional';

import {api} from '../api/baseApi';

const additionalSlice = api.injectEndpoints({
  endpoints: builder => ({
    getTermsAndCondition: builder.query<ITermsConditions, any>({
      query: () => ({
        url: `/terms-and-conditions`,
      }),
      //   providesTags: ['additional'],
    }),
    getFaqs: builder.query<IFaqs, any>({
      query: () => ({
        url: `/faqs`,
      }),
      //   providesTags: ['additional'],
    }),
    // updateAdditional: builder.mutation({
    //     query: data => ({
    //         url: `/additional`,
    //         method: 'POST',
    //         body: data,
    //     }),
    //     invalidatesTags: ['additional'],
    // }),
    createSupport: builder.mutation<any, {message: string}>({
      query: data => ({
        url: `/support`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['additional'],
    }),
    // deleteAdditional: builder.mutation({
    //     query: id => ({
    //         url: `/additional/${id}`,
    //         method: 'DELETE',
    //     }),
    //     invalidatesTags: ['additional'],
    // }),
  }),
});

export const {
  useGetTermsAndConditionQuery,
  useGetFaqsQuery,
  useCreateSupportMutation,
} = additionalSlice;
