import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { resetAllStates } from '../store';

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

export type CustomError =
  | FetchBaseQueryError
  | {
      status: 'FETCH_ERROR';
      data: any;
    };

const baseQueryInterceptor: BaseQueryFn<string | FetchArgs, unknown, CustomError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(resetAllStates());
    window.location.href = '/login';
  }
  return result;
};

export const api = createApi({
  reducerPath: 'generalApi',
  // @ts-ignore
  baseQuery: baseQueryInterceptor,
  tagTypes: ['Pokemon', 'ProgramDetails', 'CollectionDetails', 'StudentsProgress'],
  endpoints: () => ({}),
});
