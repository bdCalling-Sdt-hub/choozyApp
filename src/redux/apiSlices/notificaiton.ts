import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
      providesTags: ['product'],
    }),
    readNotification: builder.mutation({
      query: id => ({
        url: `/notifications/read/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['product'],
    }),
    readAllNotification: builder.mutation({
      query: id => ({
        url: `/notifications/read-all`,
        method: 'POST',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} = authSlice;
