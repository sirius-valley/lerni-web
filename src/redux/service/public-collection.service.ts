import { publicApi } from './public-api';
import { CollectionDetailsResponseDto } from './types/collection.types';
import { CollectionStudentsResponse } from './types/students.response';

export const publicCollectionApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    publicCollectionDetails: builder.query<CollectionDetailsResponseDto, string>({
      providesTags: ['PublicCollectionDetails'],
      query: (id) => ({
        url: `colections/${id}`,
        method: 'GET',
      }),
    }),
    publicCollectionStudents: builder.query<
      CollectionStudentsResponse,
      {
        collectionId: string;
        limit?: number;
        offset?: number;
        search?: string;
      }
    >({
      providesTags: ['PublicCollectionStudents'],
      query: ({ collectionId, limit = 10, offset = 0, search }) => ({
        url: `colections/students/${collectionId}`,
        method: 'GET',
        params: {
          limit,
          offset,
          ...(search && { search }),
        },
      }),
    }),
  }),
});

export const { usePublicCollectionDetailsQuery, usePublicCollectionStudentsQuery } =
  publicCollectionApi;
