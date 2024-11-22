import {IGroupList, IGroupMessageList} from '../interface/group';

import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getGroups: builder.query<IGroupList, any>({
      query: id => ({
        url: `/your-group`,
      }),
      providesTags: ['group'],
    }),
    getGroupMessages: builder.query<IGroupMessageList, any>({
      query: id => ({
        url: `/get-group-messages?groupId=${id}`,
      }),
      providesTags: ['group'],
    }),
    getGroupMembers: builder.query<any, string>({
      query: (id: string) => ({
        url: `/groups/${id}/members`,
      }),
      providesTags: ['group'],
    }),
    createGroup: builder.mutation({
      query: data => ({
        url: `/groups`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    updateGroup: builder.mutation({
      query: data => ({
        url: `/groups/${data.id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    addMember: builder.mutation({
      query: data => ({
        url: `/groups/${data.id}/members`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    messageRead: builder.mutation({
      query: id => ({
        url: `/group-messages/2/read/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['message'],
    }),
    sendGroupMessage: builder.mutation({
      query: data => ({
        url: `/send-group-messages`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['message'],
    }),
    deleteMember: builder.mutation({
      query: ({groupId, memberId}) => ({
        url: `/groups/${groupId}/members/${memberId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['group'],
    }),
    deleteGroupMessage: builder.mutation({
      query: id => ({
        url: `/group-messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['message'],
    }),
  }),
});

export const {
  useAddMemberMutation,
  useCreateGroupMutation,
  useDeleteMemberMutation,
  useGetGroupMembersQuery,
  useGetGroupsQuery,
  useUpdateGroupMutation,
  useDeleteGroupMessageMutation,
  useGetGroupMessagesQuery,
  useLazyGetGroupMessagesQuery,
  useMessageReadMutation,
  useSendGroupMessageMutation,
  useLazyGetGroupsQuery,
} = authSlice;
