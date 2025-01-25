import {api} from '../api/baseApi';
import {ISearchResponse} from '../interface/search';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    search: builder.query<ISearchResponse, any>({
      query: ({search, city = '', state = '', country = ''}) => ({
        url: `/search?query=${search}?city=${city}?state=${state}?country=${country}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useSearchQuery, useLazySearchQuery} = authSlice;
