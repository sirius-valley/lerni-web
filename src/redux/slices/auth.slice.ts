import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../service/auth.service';
import { Permissions, PermissionType } from '../service/types/auth.types';

interface InitialStateAuthType {
  token: string;
  permissions: Permissions;
}

const permissionsInitialState: Permissions = {
  collections: {
    general: [PermissionType.READ],
    specific: [],
  },
  programs: {
    general: [PermissionType.READ],
    specific: [],
  },
};

const initialState: InitialStateAuthType = {
  token: '',
  permissions: permissionsInitialState,
};

const mockedPermissions: Permissions = {
  collections: {
    general: [PermissionType.READ],
    specific: [],
  },
  programs: {
    general: [PermissionType.READ, PermissionType.CREATE],
    specific: [],
  },
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.token = '';
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<AuthType>) => {
        const token = action.payload.token ?? '';
        state.token = token;
        localStorage.setItem('token', token);
      },
    );
    builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
      state.token = '';
    });
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action: PayloadAction<AuthType>) => {
        const token = action.payload.token ?? '';
        state.token = token;
        localStorage.setItem('token', token);
      },
    );
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.permissions = mockedPermissions;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
