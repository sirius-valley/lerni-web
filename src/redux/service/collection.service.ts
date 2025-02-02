import { api } from './api';
import {
  CollectionDetailsResponseDto,
  CollectionListResponse,
  CreateCollectionRequestDto,
  StudentCollectionRequestDto,
} from './types/collection.types';
import { StudentDTO } from './types/students.response';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation<any, CreateCollectionRequestDto>({
      query: (body) => ({
        url: 'colections',
        method: 'POST',
        body: body,
      }),
    }),
    updateCollection: builder.mutation<any, { id: string; body: CreateCollectionRequestDto }>({
      query: ({ id, body }) => ({
        url: `colections/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    collectionList: builder.query<CollectionListResponse, void>({
      providesTags: ['CollectionList'],
      query: () => ({
        url: 'colections',
        method: 'GET',
      }),
    }),
    collectionDetails: builder.query<CollectionDetailsResponseDto, string>({
      providesTags: ['CollectionDetails'],
      query: (id) => ({
        url: `colections/${id}`,
        method: 'GET',
      }),
    }),
    collectionStudentsList: builder.query<StudentDTO[], string>({
      providesTags: ['CollectionStudentsList'],
      query: (collectionId) => ({
        url: `colections/students/in-progress/${collectionId}`,
        method: 'GET',
      }),
    }),
    verifyCollectionStudents: builder.mutation<StudentDTO[], any>({
      query: (body) => ({
        url: 'colections/student/check',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) =>
        response.map((student: any) => {
          const { groups, ...rest } = student;
          return {
            ...rest,
            group: groups?.map((groupName: string) => ({ name: groupName })) || [],
          };
        }),
    }),
    addStudentsToCollection: builder.mutation<
      any,
      { collectionId: string; body: StudentCollectionRequestDto }
    >({
      query: ({ collectionId, body }) => ({
        url: `colections/student/batch/${collectionId}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useCollectionListQuery,
  useCollectionDetailsQuery,
  useCollectionStudentsListQuery,
  useVerifyCollectionStudentsMutation,
  useAddStudentsToCollectionMutation,
} = collectionApi;
