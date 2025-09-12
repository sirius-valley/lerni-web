import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { institutionApi } from '../service/institution.service';

export interface InstitutionState {
  id: string;
  name: string;
  studentLimit: number;
  picture: string;
  collections: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  edit: boolean;
  isLoading: boolean;
}

const initialState: InstitutionState = {
  id: '',
  name: '',
  studentLimit: 0,
  picture: '',
  collections: [],
  edit: false,
  isLoading: false,
};

export const institutionSlice = createSlice({
  name: 'institution',
  initialState,
  reducers: {
    updateInstitutionInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetInstitutionSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      institutionApi.endpoints.getInstitutionDetails.matchFulfilled,
      (state, action) => {
        state.id = action.payload?.id;
        state.name = action.payload?.name;
        state.studentLimit = action.payload?.studentLimit;
        state.picture = action.payload?.picture;
        state.collections = action.payload?.collections;
        state.edit = false;
        state.isLoading = false;
      },
    );
    builder.addMatcher(
      institutionApi.endpoints.updateInstitution.matchFulfilled,
      (state, action) => {
        state.name = action.payload?.name;
        state.studentLimit = action.payload?.studentLimit;
        state.picture = action.payload?.picture;
        state.edit = false;
      },
    );
  },
});

const institution: any = (state: RootState) => state.institution;

export const { updateInstitutionInfo, setEdit, isLoading, resetInstitutionSlice } =
  institutionSlice.actions;

export default institutionSlice.reducer;
