import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programApi } from '../service/program.service';

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
  trivia?: string;
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
}

const initialState: CreateProgramState = {
  title: '',
  image: '',
  description: '',
  professor: '',
  pills: [],
  questionnaire: undefined,
  trivia: undefined,
  students: [],
  hoursToComplete: 0,
  pointsReward: 0,
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

  // extraReducers: (builder) => {
  //
  // }
});

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
