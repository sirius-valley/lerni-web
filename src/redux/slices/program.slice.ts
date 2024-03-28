import { createSlice } from '@reduxjs/toolkit';
import { programApi } from '../service/program.service';

type Pill = {
  id: string;
  title: string;
  description: string;
  lerniPill: any;
};

interface CounterState {
  pills: Pill[];
}

const initialState: CounterState = {
  pills: [],
};

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
  },
  // extraReducers: (builder) => {
  //
  // }
});

export const { addNewPill, removePill } = programSlice.actions;

export default programSlice.reducer;
