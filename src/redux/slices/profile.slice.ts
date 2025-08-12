import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { studentsApi } from '../service/students.service';
import { ProgramCardItem } from '../service/types/profile.types';
import { Achievement } from '../service/types/students.response';

export interface ProfileState {
  id: string;
  fullname: string;
  email: string;
  image?: string;
  career: string;
  city: string;
  groups: string[];
  points: number;
  assignedPrograms?: ProgramCardItem[];
  rewards?: Achievement[];
}

const initialState: ProfileState = {
  id: '',
  fullname: '',
  email: '',
  image: '',
  career: '',
  city: '',
  groups: [],
  points: 0,
  assignedPrograms: [],
  rewards: [],
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProfileSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(studentsApi.endpoints.studentProfile.matchFulfilled, (state, action) => {
      state.id = action.payload.id;
      state.fullname = action.payload.displayName;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.career = action.payload.career;
      state.city = action.payload.city;
      state.points = action.payload.points;
      state.groups = action.payload.groups;
      state.assignedPrograms = [];
      state.rewards = action.payload.rewards || [];
    });
  },
});

export const selectProfile = (state: RootState) => state.profile;

export const { updateProfile, resetProfileSlice } = profileSlice.actions;

export default profileSlice.reducer;
