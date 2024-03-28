import { createSlice } from '@reduxjs/toolkit';

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
  name: string;
  description: string;
  passingScore: number;
  cooldownInMinutes: number;
  block: string;
  questionCount: number;
  completionTimeMinutes: number;
  order: number;
}

interface CreateProgramState {
  title: string;
  image: string;
  description: string;
  professor: string;
  pills: Pill[];
  questionnaire: Questionnaire;
  trivia: string;
  students: string[];
  hoursToComplete: number;
  pointsReward: number;
}

const initialState: CreateProgramState = {
  title: '',
  image: '',
  description: '',
  professor: '',
  pills: [],
  questionnaire: {
    name: '',
    description: '',
    passingScore: 0,
    cooldownInMinutes: 0,
    block: '',
    questionCount: 0,
    completionTimeMinutes: 0,
    order: 0,
  },
  trivia: '',
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
  },

  // extraReducers: (builder) => {
  //
  // }
});

export const { addNewPill, removePill, updatePillInfo } = programSlice.actions;

export default programSlice.reducer;
