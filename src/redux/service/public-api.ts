import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// Token fijo para acceso público a student progress
const PUBLIC_ACCESS_TOKEN =
  process.env.REACT_APP_PUBLIC_ACCESS_TOKEN ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMDM0NDFjYS00YzE4LTQ5MWYtODMzNC1jZTJiMDRiZTA3MDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTY5MDMwNTAsImV4cCI6MTc1NzUwNzg1MH0.KFcBAC7oQ9JLS-8qq04c4hWdts4DaW9vvshXqd2iJiY';

const publicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL || '',
  prepareHeaders: (headers) => {
    // Usar token fijo para acceso público
    headers.set('Authorization', `Bearer ${PUBLIC_ACCESS_TOKEN}`);
    return headers;
  },
});

export type CustomError =
  | FetchBaseQueryError
  | {
      status: 'FETCH_ERROR';
      data: any;
    };

const publicBaseQueryInterceptor: BaseQueryFn<string | FetchArgs, unknown, CustomError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await publicBaseQuery(args, api, extraOptions);
  // No redirigir al login en rutas públicas si hay error 401
  return result;
};

export const publicApi = createApi({
  reducerPath: 'publicApi',
  // @ts-ignore
  baseQuery: publicBaseQueryInterceptor,
  tagTypes: ['PublicCollectionDetails', 'PublicCollectionStudents'],
  endpoints: () => ({}),
});
