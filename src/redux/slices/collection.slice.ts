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
}

const initialState: CreateCollectionState = {
  title: '',
  programs: [],
  studentsState: {
    initial: [],
    current: [],
  },
  edit: true,
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
    setStudents: (state, action: PayloadAction<StudentDTO[]>) => {
      state.studentsState = {
        current: action.payload,
        initial: action.payload,
      };
    },
    resetCollectionSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      collectionApi.endpoints.collectionDetails.matchFulfilled,
      (state, action) => {
        console.log('collectionDetails', action.payload);
        state.edit = false;
        state.title = action.payload.name;
        state.programs = action.payload.programs.map((program) => {
          return {
            icon: program.program.icon,
            name: program.program.name,
            programVersionId: program.id,
          } as ProgramListItem;
        });
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
  setStudents,
  resetCollectionSlice,
} = collectionSlice.actions;

export default collectionSlice.reducer;
