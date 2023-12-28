import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL || '',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryInterceptor = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch({ type: 'login/logout', payload: result.data });
  }
  return result;
};

export const api = createApi({
  reducerPath: 'generalApi',
  // @ts-ignore
  baseQuery: baseQueryInterceptor,
  tagTypes: ['Pokemon'],
  endpoints: () => ({}),
});
