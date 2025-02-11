import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {getStorageToken} from '../../utils/utils';

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  const token = getStorageToken();

  try {
    const result: AxiosResponse = await axios({
      // baseURL: 'http://192.168.12.140:8000/api',
      baseURL: 'http://137.184.184.228/api',
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    // console.log(result.data);
    // Check if response data is a string and malformed
    if (typeof result?.data === 'string') {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += '}');
      return {data: JSON.parse(withCurly)};
      // }
    }
    if (typeof result?.data === 'object') {
      return {data: result?.data};
    }

    return {data: result?.data};
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === 'string') {
        const withCurly = (error.response.data += '}');

        return {error: JSON.parse(withCurly)};
      } else {
        return {error: error.response?.data};
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || 'Something went wrong',
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: [
    'user',
    'message',
    'group',
    'news_feed',
    'friend',
    'shop',
    'product',
    'wall',
    'payment',
    'wallet',
    'comment',
    'order',
  ],
});

// export const imageUrl = 'http://192.168.12.160:7000/';
export const imageUrl = 'http://137.184.184.228/';
