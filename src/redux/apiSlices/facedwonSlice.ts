import { IFacedowns } from "../interface/facedown";

import { api } from "../api/baseApi";

export const faceDownSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getFaceDown: builder.query<IFacedowns , unknown>({
            query: ({id,page,limit}) => ({
                url: `/facedowns`,
              
            }),
            providesTags : ["facedown"]
        }),
        createFaceDown: builder.mutation({
            query: (data) => ({
                url: `/facedowns`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["facedown"]
          }),
        deleteFacedown: builder.mutation({
            query: (id) => ({
                url: `/facedowns/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags : ["facedown"]
          }),
    }),
})


export const { useCreateFaceDownMutation,useGetFaceDownQuery,useDeleteFacedownMutation } = faceDownSlices;