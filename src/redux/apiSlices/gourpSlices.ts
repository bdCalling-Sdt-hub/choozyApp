import {api} from '../api/baseApi';
import {IGroupList} from '../interface/group';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getGroups: builder.query<IGroupList, any>({
      query: id => ({
        url: `/groups`,
      }),
      providesTags: ['group'],
    }),
    getGroupMembers: builder.query({
      query: id => ({
        url: `/groups/${id}/members`,
      }),
      providesTags: ['group'],
    }),
    createGroup: builder.mutation({
      query: data => ({
        url: `/groups`,
        method: 'POST',
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
} = authSlice;
