import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../service/types/groups.types';
import { groupsApi } from '../service/groups.service';
import { RootState } from '../store';

interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    resetProgramSlice: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(groupsApi.endpoints.getGroups.matchFulfilled, (state, action) => {
      state.groups = action.payload;
    });
  },
});

const groups: any = (state: RootState) => state.groups;

export const { setGroups, resetProgramSlice } = groupsSlice.actions;

export default groupsSlice.reducer;
