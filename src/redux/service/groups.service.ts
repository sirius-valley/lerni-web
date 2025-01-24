import { api } from './api';
import { GroupDTO } from './types/groups.types';

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GroupDTO[], void>({
      query: () => ({
        url: `group`,
        method: 'GET',
      }),
    }),
    getGroup: builder.query<GroupDTO, string>({
      query: (id) => ({
        url: `group/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useGetGroupQuery } = groupsApi;
