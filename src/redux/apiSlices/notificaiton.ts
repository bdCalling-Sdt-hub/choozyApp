import {api} from '../api/baseApi';
import {INotificationList} from '../interface/notificaiton';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<INotificationList, any>({
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
      query: () => ({
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
