import { api } from './api';
import { Group } from './types/groups.types';

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: () => ({
        url: `group`,
        method: 'GET',
      }),
    }),
    getGroup: builder.query<Group, string>({
      query: (id) => ({
        url: `group/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useGetGroupQuery } = groupsApi;
