import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../service/auth.service';
import { Permissions } from '../service/types/auth.types';

interface InitialStateAuthType {
  token: string;
  permissions: Permissions;
  institutionIds: string[];
}

const permissionsInitialState: Permissions = {
  collections: {
    permissions: [],
  },
  programs: {
    permissions: [],
  },
  profile: {
    permissions: [],
  },
  professors: {
    permissions: [],
  },
  stats: {
    permissions: [],
  },
};

const initialState: InitialStateAuthType = {
  token: '',
  permissions: permissionsInitialState,
  institutionIds: [],
};

const isPermissions = (permissions: any): permissions is Permissions => {
  if (
    permissions &&
    typeof permissions === 'object' &&
    'collections' in permissions &&
    'programs' in permissions &&
    'profile' in permissions &&
    'professors' in permissions &&
    'stats' in permissions
  ) {
    return true;
  }
  return false;
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
    builder.addMatcher(authApi.endpoints.me.matchRejected, (state, action) => {
      // Keep current permissions on error
    });
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      const permissions = action.payload.permissions;
      //const permissions = mockedPermissions('fullAccess');
      const institutionIds = action.payload.institutionIds || [];
      if (isPermissions(permissions)) {
        state.permissions = permissions;
      } else {
        console.warn('Invalid permissions format received:', permissions);
        state.permissions = permissionsInitialState;
      }
      state.institutionIds = institutionIds;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
