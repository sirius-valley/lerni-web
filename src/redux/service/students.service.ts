import { api } from './api';
import { StudentsRegisteredResponse } from './types/students.response';

export const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    studentsRegistered: builder.query<StudentsRegisteredResponse, void>({
      query: () => ({
        url: `api/student/registered`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useStudentsRegisteredQuery } = studentsApi;
