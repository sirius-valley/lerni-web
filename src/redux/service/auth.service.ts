import { api } from './api';

export type AuthType = { token?: string; data: { message: string } };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthType, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: `auth/admin/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<
      AuthType,
      {
        email: string;
        password: string;
        name: string;
        lastname: string;
      }
    >({
      query: ({ email, password, name, lastname }) => ({
        url: `auth/admin/register`,
        method: 'POST',
        body: { email, password, name, lastname },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
