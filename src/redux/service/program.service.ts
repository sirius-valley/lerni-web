import { api } from './api';
import {
  ConvertPillBody,
  ConvertTypeResponse,
  ProgramListItem,
  ProgramListResponse,
} from './types/program.types';

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
    verifyStudents: builder.mutation<any, any>({
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
      }),
    }),
    programDetails: builder.query<any, string>({
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
  }),
});

export const {
  useConvertToLerniPillMutation,
  useConvertTriviaToLerniPillMutation,
  useVerifyStudentsMutation,
  useCreateProgramMutation,
  useProgramListQuery,
  useProgramDetailsQuery,
} = programApi;
