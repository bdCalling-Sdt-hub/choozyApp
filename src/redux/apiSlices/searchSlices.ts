import {api} from '../api/baseApi';
import {ISearchResponse} from '../interface/search';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    search: builder.query<ISearchResponse, any>({
      query: ({search, city, state, country, zip_code}) => ({
        url: `/search?query=${search}?city=${city}&state=${state}&country=${country}&zip_code=${zip_code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useSearchQuery, useLazySearchQuery} = authSlice;
