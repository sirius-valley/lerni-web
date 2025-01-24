import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProgramListItem } from '../service/types/program.types';
import { collectionApi } from '../service/collection.service';
import { StudentDTO } from '../service/types/students.response';

export interface CreateCollectionState {
  title: string;
  programs: ProgramListItem[];
  students: StudentDTO[];
  edit: boolean;
}

const initialState: CreateCollectionState = {
  title: '',
  programs: [],
  students: [],
  edit: true,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    updateCollectionInfo: (state, action) => {
      console.log('modifying state', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    removeStudent: (state, action: PayloadAction<{ email: string }>) => {
      state.students = state.students.filter((user) => user.email !== action.payload.email);
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
            programVersionId: program.program.id,
          } as ProgramListItem;
        });
      },
    );
  },
});

const collection: any = (state: RootState) => state.collection;

export const { updateCollectionInfo, removeStudent, resetCollectionSlice } =
  collectionSlice.actions;

export default collectionSlice.reducer;
