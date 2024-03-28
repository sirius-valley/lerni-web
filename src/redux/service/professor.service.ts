import { api } from './api';

export const professorApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateProfessorMutation } = professorApi;
