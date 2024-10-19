import {api} from '../api/baseApi';
import {ISearchResponse} from '../interface/search';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    search: builder.query<ISearchResponse, any>({
      query: search => ({
        url: `/search?query=${search}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useSearchQuery} = authSlice;
