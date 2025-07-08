import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homellcApi = createApi({
  reducerPath: 'homellcApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_HOST + ":3000" }),
  keepUnusedDataFor: 300,
  tagTypes: ['User', 'Home'],
  endpoints: (builder) => ({
    findAllUsers: builder.query({
      query: () => '/user/find-all',
      providesTags: ['User'],
    }),
    findHomesByUser: builder.query({
      query: ({ userId, page = 1, pageSize = 50 }) => `/home/find-by-user/${userId}?page=${page}&pageSize=${pageSize}`,
      providesTags: ['Home'],
    }),
    findUsersByHome: builder.query({
      query: (homeId) => `/user/find-by-home/${homeId}`,
    }),
    updateHomeUsers: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: `/home/update-users`,
        method: 'PUT',
        body: { homeId, userIds },
      }),
      invalidatesTags: ['Home'],
    }),
  }),
});

export const { useFindAllUsersQuery, useFindUsersByHomeQuery, useLazyFindHomesByUserQuery, useLazyFindUsersByHomeQuery, useUpdateHomeUsersMutation } = homellcApi;