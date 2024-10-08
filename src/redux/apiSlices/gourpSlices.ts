import {api} from '../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getGroups: builder.query({
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
    deleteMember: builder.mutation({
      query: ({groupId, memberId}) => ({
        url: `/groups/${groupId}/members/${memberId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['group'],
    }),
    deleteMessage: builder.mutation({
      query: id => ({
        url: `/deleteMessage/${id}`,
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
  useDeleteMessageMutation,
} = authSlice;
