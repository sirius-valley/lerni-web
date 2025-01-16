import { api } from './api';
import { StudentDetailsResponse, StudentsRegisteredResponse } from './types/students.response';

export const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    studentsRegistered: builder.query<StudentsRegisteredResponse, void>({
      query: () => ({
        url: `api/student/registered`,
        method: 'GET',
      }),
    }),
    studentProfile: builder.query<StudentDetailsResponse, string>({
      query: (id: string) => ({
        url: `api/student/profile/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useStudentsRegisteredQuery, useStudentProfileQuery } = studentsApi;
