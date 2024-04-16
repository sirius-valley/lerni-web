import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programApi } from '../service/program.service';
import { RootState } from '../store';

type Pill = {
  id: string;
  title: string;
  description: string;
  teacherComment: string;
  version: number;
  completionTimeMinutes: number;
  lerniPill: any;
};
interface Questionnaire {
  id: string;
  type: string;
  initial: string;
  elements: any[];
  relations: any[];
}

export interface CreateProgramState {
  title: string;
  image: string;
  description: string;
  professor: string;
  pills: Pill[];
  questionnaire?: Questionnaire;
  trivia?: any;
  students: {
    authId: string;
    career: string;
    city: string;
    email: string;
    id: string;
    image?: string;
    lastname: string;
    name: string;
    profession?: string;
  }[];
  hoursToComplete: number;
  pointsReward: number;
  edit: boolean;
}

const initialState: CreateProgramState = {
  title: '',
  image: '',
  description: '',
  professor: '',
  pills: [],
  questionnaire: undefined,
  trivia: undefined,
  // trivia: {
  //   id: '',
  //   type: 'RANDOM',
  //   seed: 0,
  //   elements: [
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2900',
  //       type: 'QUESTION',
  //       name: 'Pregunta 0',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 1 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Verdadera',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2911',
  //       type: 'QUESTION',
  //       name: 'Pregunta 1',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 2 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Verdadera',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2922',
  //       type: 'QUESTION',
  //       name: 'Pregunta 2',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 3 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 Verdadera',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2933',
  //       type: 'QUESTION',
  //       name: 'Pregunta 3',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 4 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Verdadera',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2944',
  //       type: 'QUESTION',
  //       name: 'Pregunta 4',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 1 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Verdadera',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2955',
  //       type: 'QUESTION',
  //       name: 'Pregunta 5',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 2 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Verdadera',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2966',
  //       type: 'QUESTION',
  //       name: 'Pregunta 6',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 3 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 Verdadera',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2977',
  //       type: 'QUESTION',
  //       name: 'Pregunta 7',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 4 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Verdadera',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2988',
  //       type: 'QUESTION',
  //       name: 'Pregunta 8',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 1 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Verdadera',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e2999',
  //       type: 'QUESTION',
  //       name: 'Pregunta 9',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 2 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Verdadera',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291010',
  //       type: 'QUESTION',
  //       name: 'Pregunta 10',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 3 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 Verdadera',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291111',
  //       type: 'QUESTION',
  //       name: 'Pregunta 11',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 4 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Verdadera',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291212',
  //       type: 'QUESTION',
  //       name: 'Pregunta 12',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 1 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Verdadera',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291313',
  //       type: 'QUESTION',
  //       name: 'Pregunta 13',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 2 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Verdadera',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291414',
  //       type: 'QUESTION',
  //       name: 'Pregunta 14',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 3 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 Verdadera',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291515',
  //       type: 'QUESTION',
  //       name: 'Pregunta 15',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 4 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Verdadera',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291616',
  //       type: 'QUESTION',
  //       name: 'Pregunta 16',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 1 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Verdadera',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291717',
  //       type: 'QUESTION',
  //       name: 'Pregunta 17',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 2 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Verdadera',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291818',
  //       type: 'QUESTION',
  //       name: 'Pregunta 18',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 3 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 Verdadera',
  //           'Opcion 4 Falsa',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //     {
  //       id: '3fa64704-3377-4238-8b22-e64c06772e291919',
  //       type: 'QUESTION',
  //       name: 'Pregunta 19',
  //       question_type: 'SINGLECHOICE',
  //       metadata: {
  //         metadata: {
  //           lerni_question_type: 'single-choice',
  //           seconds_to_answer: 30,
  //           correct_answer: 'Opcion 4 Verdadera',
  //         },
  //         options: [
  //           'Opcion 1 Falsa',
  //           'Opcion 2 Falsa',
  //           'Opcion 3 falsa',
  //           'Opcion 4 Verdadera',
  //           'timeout',
  //           'left',
  //         ],
  //       },
  //     },
  //   ],
  // },
  students: [],
  hoursToComplete: 0,
  pointsReward: 0,
  edit: true,
};
// just to have it mocked, then we can remove field values

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    addNewPill: (state, action) => {
      state.pills = [...state.pills, action.payload];
    },
    removePill: (state, action) => {
      state.pills = state.pills.filter((pill) => pill.id !== action.payload);
    },
    updatePillInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeQuestionnaire: (state, action: PayloadAction<void>) => {
      state.questionnaire = undefined;
    },
    removeTrivia: (state, action: PayloadAction<void>) => {
      state.trivia = undefined;
    },
    removeStudent: (state, action: PayloadAction<{ email: string }>) => {
      state.students = state.students.filter((user) => user.email !== action.payload.email);
    },
    resetProgramSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(programApi.endpoints.programDetails.matchFulfilled, (state, action) => {
      state.edit = false;
      state.title = action.payload.programName;
      state.image = action.payload.icon;
      state.professor = action.payload.teacher.id;
      state.description = action.payload.programDescription;
      state.students = action.payload.students ?? [];
      state.pills = action.payload.pills.map((pill: any) => ({
        ...pill,
        lerniPill: JSON.parse(pill.block),
        title: pill.name,
      }));
      state.questionnaire =
        action.payload?.questionnaire[0]?.block !== undefined
          ? JSON.parse(action.payload?.questionnaire[0]?.block)
          : undefined;
      state.trivia =
        action.payload?.trivias?.[0]?.block !== undefined
          ? JSON.parse(action.payload?.trivias?.[0].block)
          : undefined;
    });
  },
});

const program: any = (state: RootState) => state.program;

export const getBlockByType = createSelector(
  [program, (values, props: { id?: string; type: string }) => props],
  (values, props) => {
    switch (props.type) {
      case 'trivia':
        return values?.trivia;
      case 'questionnaire':
        return values?.questionnaire;
      case 'pill':
        return values?.pills?.find((pill: any) => pill.id === props.id)?.lerniPill;
    }
  },
);

export const {
  resetProgramSlice,
  addNewPill,
  removeStudent,
  removeQuestionnaire,
  removeTrivia,
  removePill,
  updatePillInfo,
} = programSlice.actions;

export default programSlice.reducer;
