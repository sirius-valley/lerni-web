import { api } from './api';
import {
  CollectionDetailsResponseDto,
  CollectionListResponse,
  CreateCollectionRequestDto,
} from './types/collection.types';
import { StudentDTO } from './types/students.response';

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
      query: (collectionId) => ({
        url: `colections/students/in-progress/${collectionId}`,
        method: 'GET',
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
} = collectionApi;
