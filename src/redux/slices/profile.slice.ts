import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { studentsApi } from '../service/students.service';

export interface ProfileState {
  id: string;
  fullname: string;
  email: string;
  image?: string;
  career: string;
  city: string;
  groups: string[];
  points: number;
}

const initialState: ProfileState = {
  id: '',
  fullname: '',
  email: '',
  image: '',
  career: '',
  city: '',
  groups: ['Nuevos', 'Enfermeros', 'Residentes'],
  points: 0,
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
      state.fullname = `${action.payload.name} ${action.payload.lastname}`;
      state.email = 'Por ahora no hay mail';
      state.image = action.payload.image;
      state.career = action.payload.career || 'Sin profesión';
      state.city = action.payload.city || 'Sin ciudad';
      state.points = action.payload.points || 0;
    });
  },
});

const profile: any = (state: RootState) => state.profile;

export const { updateProfile, resetProfileSlice } = profileSlice.actions;

export default profileSlice.reducer;
