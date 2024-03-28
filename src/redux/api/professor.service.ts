import { api } from './api';

export const professorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfessors: builder.query<any, void>({
      query: () => ({
        url: 'api/professor',
        method: 'GET',
      }),
    }),

    createProfessor: builder.mutation<
      any,
      { name: string; lastname: string; profession: string; description: string; image: string }
    >({
      query: (professorInfo) => ({
        url: 'api/professor/create',
        method: 'POST',
        body: professorInfo,
      }),
    }),
  }),
});

export const { useCreateProfessorMutation, useGetProfessorsQuery } = professorApi;
