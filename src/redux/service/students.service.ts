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
    studentsList: builder.query<StudentsRegisteredResponse, number>({
      query: (page: number) => ({
        url: `api/student/list`,
        method: 'GET',
        params: { page },
      }),
    }),
  }),
});

export const { useStudentsRegisteredQuery, useStudentsListQuery } = studentsApi;
