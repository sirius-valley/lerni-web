import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProgramListItem } from '../service/types/program.types';
import { collectionApi } from '../service/collection.service';
import { StudentDTO } from '../service/types/students.response';

export interface CreateCollectionState {
  title: string;
  programs: ProgramListItem[];
  studentsState: {
    initial: StudentDTO[];
    current: StudentDTO[];
  };
  edit: boolean;
  isLoading: boolean;
}

const initialState: CreateCollectionState = {
  title: '',
  programs: [],
  studentsState: {
    initial: [],
    current: [],
  },
  edit: true,
  isLoading: false,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    updateCollectionInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateCollectionStudentsState: (state, action) => {
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
    addStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState.current = [...action.payload, ...state.studentsState.current];
    },
    updateStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState.current = state.studentsState.current.map((student) => {
        const updatedStudent = action.payload.find((s) => s.email === student.email);
        return updatedStudent ? updatedStudent : student;
      });
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
    resetCollectionSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      collectionApi.endpoints.collectionDetails.matchFulfilled,
      (state, action) => {
        state.edit = false;
        state.title = action.payload?.name;
        state.programs = action.payload?.programs?.map((program) => {
          return {
            icon: program.program.icon,
            name: program.program.name,
            programVersionId: program.id,
          } as ProgramListItem;
        });
        state.isLoading = false;
      },
    );
  },
});

const collection: any = (state: RootState) => state.collection;

export const {
  updateCollectionInfo,
  updateCollectionStudentsState,
  removeStudent,
  addStudents,
  updateStudents,
  setStudents,
  isLoading,
  resetCollectionSlice,
} = collectionSlice.actions;

export default collectionSlice.reducer;
