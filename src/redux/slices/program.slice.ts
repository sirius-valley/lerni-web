import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programApi } from '../service/program.service';
import { RootState } from '../store';
import dayjs from 'dayjs';
import { GroupDTO } from '../service/types/groups.types';
import { StudentDTO } from '../service/types/students.response';

type Pill = {
  id: string;
  title: string;
  description: string;
  teacherComment: string;
  version: number;
  completionTimeMinutes: number;
  lerniPill: any;
  teacherId?: string;
  groups: GroupDTO[];
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
  institution: string;
  pills: Pill[];
  questionnaire?: {
    passsingScore: string;
    cooldownInMinutes: string;
    completionTimeMinutes: string;
    questionnaire: Questionnaire;
  };
  trivia?: any;
  studentsState: {
    initial: StudentDTO[];
    current: StudentDTO[];
  };
  hoursToComplete: number;
  pointsReward: number;
  startDate: string;
  endDate: string;
  edit: boolean;
  isLoading: boolean;
}

const initialState: CreateProgramState = {
  title: '',
  image: '',
  description: '',
  professor: '',
  institution: '',
  pills: [],
  questionnaire: undefined,
  trivia: undefined,
  studentsState: {
    initial: [],
    current: [],
  },
  hoursToComplete: 0,
  pointsReward: 0,
  startDate: dayjs().toISOString(),
  endDate: dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString(),
  edit: true,
  isLoading: false,
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
    updateProgramStudentsState: (state, action) => {
      state.studentsState = {
        ...state.studentsState,
        ...action.payload,
      };
    },
    removeStudent: (state, action: PayloadAction<{ email: string }>) => {
      state.studentsState.current = state.studentsState.current.filter(
        (user) => user.email !== action.payload.email,
      );
    },
    updateStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState.current = state.studentsState.current.map((student) => {
        const updatedStudent = action.payload.find((s) => s.email === student.email);
        return updatedStudent ? updatedStudent : student;
      });
    },
    addStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState.current = [...action.payload, ...state.studentsState.current];
    },
    setStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState = {
        current: action.payload,
        initial: action.payload,
      };
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
      state.institution = action.payload.institutionId || '';
      state.description = action.payload.programDescription;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.pills = action.payload.pills.map((pill: any) => ({
        ...pill,
        id: pill.pillId,
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
      state.isLoading = false;
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
  updateProgramStudentsState,
  removeStudent,
  addStudents,
  updateStudents,
  setStudents,
  isLoading,
  removeQuestionnaire,
  removeTrivia,
  removePill,
  updatePillInfo,
} = programSlice.actions;

export default programSlice.reducer;
