import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CreateProgramState } from './program.slice';

export interface CreateCollectionState {
  title: string;
  programs: CreateProgramState[];
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
}

const initialState: CreateCollectionState = {
  title: '',
  programs: [],
  students: [],
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
  },
});

const collection: any = (state: RootState) => state.collection;

export const { updateCollectionInfo } = collectionSlice.actions;

export default collectionSlice.reducer;
