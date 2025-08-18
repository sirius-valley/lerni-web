import { api } from './api';
import {
  ConvertPillBody,
  ConvertTypeResponse,
  ProgramListItem,
  ProgramListResponse,
  LikesResponse,
  ProgramAttendanceResponse,
  QuestionnaireAttemptsResponse,
  AllProgramsChartResponse,
  StudentsStatusResponse,
} from './types/program.types';
import { StudentDTO } from './types/students.response';

// interface Pill {
//   name: string;
//   description: string;
//   teacherComment: string;
//   version: number;
//   completionTimeMinutes: number;
//   block: string;
// }

// interface Questionnaire {
//   name: string;
//   description: string;
//   passingScore: number;
//   cooldownInMinutes: number;
//   block: string;
//   questionCount: number;
//   completionTimeMinutes: number;
//   order: number;
// }

// interface CreateProgramRequest {
//   title: string;
//   image: string;
//   description: string;
//   professor: string;
//   pill: Pill[];
//   questionnaire: Questionnaire;
//   trivia: string;
//   students: string[];
//   hoursToComplete: number;
//   pointsReward: number;
// }

export const programApi = api.injectEndpoints({
  endpoints: (builder) => ({
    convertToLerniPill: builder.mutation<ConvertTypeResponse, ConvertPillBody>({
      query: (body) => ({
        url: 'api/pill/adaptToPill',
        method: 'POST',
        body: body,
      }),
    }),
    convertTriviaToLerniPill: builder.mutation<ConvertTypeResponse, ConvertPillBody>({
      query: (body) => ({
        url: 'api/trivia/adapt-to-trivia',
        method: 'POST',
        body: body,
      }),
    }),
    verifyStudents: builder.mutation<StudentDTO[], any>({
      query: (body) => ({
        url: 'api/student/check',
        method: 'POST',
        body: body,
      }),
    }),
    programList: builder.query<ProgramListResponse, void>({
      query: () => ({
        url: 'api/program/list',
        method: 'GET',
        params: { limit: 500 },
      }),
    }),
    programDetails: builder.query<any, string>({
      providesTags: ['ProgramDetails'],
      query: (id) => ({
        url: `/api/program/detail/${id}`,
        method: 'GET',
      }),
    }),
    createProgram: builder.mutation<any, any>({
      query: (body) => ({
        url: 'api/program',
        method: 'POST',
        body: body,
      }),
    }),
    getProgramLikes: builder.query<LikesResponse, string>({
      query: (id: string) => ({
        url: `api/program/likes/${id}`,
        method: 'GET',
      }),
    }),
    getProgramAttendance: builder.query<ProgramAttendanceResponse, string>({
      query: (id: string) => ({
        url: `api/program/students/${id}`,
        method: 'GET',
      }),
    }),
    getQuestionnaireAttempts: builder.query<QuestionnaireAttemptsResponse, string>({
      query: (id: string) => ({
        url: `/api/program/questionnaires/${id}`,
        method: 'GET',
      }),
    }),
    allProgramsChart: builder.query<AllProgramsChartResponse, void>({
      query: () => ({
        url: `api/program/totalProgram`,
        method: 'GET',
      }),
    }),
    studentsProgress: builder.query<
      StudentsStatusResponse,
      { programVersionId: string; studentId: string }
    >({
      providesTags: ['StudentsProgress'],
      query: ({ programVersionId, studentId }) => ({
        url: `api/program/${programVersionId}/progress/${studentId}`,
        method: 'GET',
      }),
    }),
    studentsList: builder.query<StudentDTO[], string>({
      providesTags: ['ProgramDetails'],
      query: (programVersionId) => ({
        url: `api/program/students/in-progress/${programVersionId}`,
        method: 'GET',
      }),
    }),
    resetProgress: builder.mutation<void, { programVersionId: string; studentId: string }>({
      query: ({ programVersionId, studentId }) => ({
        url: `api/program/reset-progress/${programVersionId}/${studentId}`,
        method: 'POST',
      }),
      invalidatesTags: ['ProgramDetails', 'StudentsProgress'],
    }),
  }),
});

export const {
  useConvertToLerniPillMutation,
  useConvertTriviaToLerniPillMutation,
  useVerifyStudentsMutation,
  useCreateProgramMutation,
  useGetProgramLikesQuery,
  useGetProgramAttendanceQuery,
  useGetQuestionnaireAttemptsQuery,
  useProgramListQuery,
  useProgramDetailsQuery,
  useAllProgramsChartQuery,
  useStudentsProgressQuery,
  useStudentsListQuery,
  useResetProgressMutation,
} = programApi;
