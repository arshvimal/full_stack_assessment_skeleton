import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homellcApi = createApi({
  reducerPath: 'homellcApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  endpoints: (builder) => ({
    findAllUsers: builder.query({
      query: () => '/user/find-all',
    }),
    findHomesByUser: builder.query({
      query: ({ userId, page = 1, pageSize = 50 }) => `/home/find-by-user/${userId}?page=${page}&pageSize=${pageSize}`,
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
    }),
  }),
});

export const { useFindAllUsersQuery, useLazyFindHomesByUserQuery, useLazyFindUsersByHomeQuery, useUpdateHomeUsersMutation } = homellcApi;