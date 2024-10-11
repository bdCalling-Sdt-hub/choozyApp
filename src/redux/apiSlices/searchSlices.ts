import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    search: builder.query({
      query: search => ({
        url: `/search?query=${search}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useSearchQuery} = authSlice;
