import { api } from './api';
import {
  CollectionDetailsResponseDto,
  CollectionListResponse,
  CreateCollectionRequestDto,
} from './types/collection.types';

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation<any, CreateCollectionRequestDto>({
      query: (body) => ({
        url: 'colections',
        method: 'POST',
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
  }),
});

export const { useCreateCollectionMutation, useCollectionListQuery, useCollectionDetailsQuery } =
  collectionApi;
