import { api } from './api';
import {
  StudentDetailsResponse,
  StudentsRegisteredResponse,
  CollectionStudentsResponse,
} from './types/students.response';
import { ProgramCardItem } from './types/profile.types';

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
    studentProfile: builder.query<StudentDetailsResponse, string>({
      query: (id: string) => ({
        url: `api/student/profile/byAdmin/${id}`,
        method: 'GET',
      }),
    }),
    studentPrograms: builder.query<ProgramCardItem[], string>({
      query: (studentId: string) => ({
        url: `api/program/byAdmin/${studentId}`,
        method: 'GET',
      }),
    }),
    collectionStudents: builder.query<
      CollectionStudentsResponse,
      {
        collectionId: string;
        limit?: number;
        offset?: number;
        search?: string;
      }
    >({
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

export const {
  useStudentsRegisteredQuery,
  useStudentsListQuery,
  useStudentProfileQuery,
  useStudentProgramsQuery,
  useCollectionStudentsQuery,
} = studentsApi;
