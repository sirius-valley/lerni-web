import { api } from './api';
import {
  InstitutionDetailsResponse,
  UpdateInstitutionRequest,
  CreateInstitutionRequest,
  InstitutionListItem,
  InstitutionResponseDto,
  InstitutionListResponseDto,
  InstitutionListQueryParams,
} from './types/institution.types';

export const institutionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutionDetails: builder.query<InstitutionDetailsResponse, string>({
      query: (id) => ({
        url: `api/institutions/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: InstitutionResponseDto): InstitutionDetailsResponse => {
        return {
          id: response.id,
          name: response.name,
          studentLimit: response.studentLimit,
          picture: response.picture,
          collections: response.collections || [],
        };
      },
      providesTags: ['InstitutionDetails'],
    }),
    getInstitutionsList: builder.query<
      InstitutionListResponseDto,
      InstitutionListQueryParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params && params.limit) searchParams.append('limit', params.limit.toString());
        if (params && params.offset) searchParams.append('offset', params.offset.toString());

        return {
          url: `api/institutions?${searchParams.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: InstitutionListResponseDto): InstitutionListResponseDto => {
        return response;
      },
      providesTags: ['InstitutionList'],
    }),
    updateInstitution: builder.mutation<InstitutionDetailsResponse, UpdateInstitutionRequest>({
      query: ({ id, ...body }) => ({
        url: `api/institutions/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: InstitutionResponseDto): InstitutionDetailsResponse => {
        return {
          id: response.id,
          name: response.name,
          studentLimit: response.studentLimit,
          picture: response.picture,
          collections: response.collections || [],
        };
      },
      invalidatesTags: ['InstitutionDetails', 'InstitutionList'],
    }),
    createInstitution: builder.mutation<InstitutionDetailsResponse, CreateInstitutionRequest>({
      query: (body) => ({
        url: 'api/institutions',
        method: 'POST',
        body,
      }),
      transformResponse: (response: InstitutionResponseDto): InstitutionDetailsResponse => {
        return {
          id: response.id,
          name: response.name,
          studentLimit: response.studentLimit,
          picture: response.picture,
          collections: response.collections || [],
        };
      },
      invalidatesTags: ['InstitutionList'],
    }),
    deleteInstitution: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/institutions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InstitutionList'],
    }),
  }),
});

export const {
  useGetInstitutionDetailsQuery,
  useGetInstitutionsListQuery,
  useUpdateInstitutionMutation,
  useCreateInstitutionMutation,
  useDeleteInstitutionMutation,
} = institutionApi;
