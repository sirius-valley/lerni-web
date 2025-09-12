import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../service/auth.service';
import { Permissions } from '../service/types/auth.types';

interface InitialStateAuthType {
  token: string;
  permissions: Permissions;
  institutionIds: string[];
}

const permissionsInitialState: Permissions = {
  collections: [],
  programs: [],
  profile: [],
  professors: [],
  stats: [],
  institutions: [],
};

const initialState: InitialStateAuthType = {
  token: '',
  permissions: permissionsInitialState,
  institutionIds: [],
};

const isPermissions = (permissions: any): permissions is Permissions => {
  // Check if permissions object exists and is an object
  if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
    return false;
  }

  // Check if all required properties exist (only the ones backend actually sends)
  const requiredProperties = ['collections', 'programs', 'profile', 'institutions'];
  for (const prop of requiredProperties) {
    if (!(prop in permissions)) {
      console.warn(`Missing required permission property: ${prop}`);
      return false;
    }
  }

  // Check if all properties are arrays
  for (const prop of requiredProperties) {
    if (!Array.isArray(permissions[prop])) {
      console.warn(`Permission property ${prop} is not an array:`, permissions[prop]);
      return false;
    }
  }

  // Check if all array elements are strings
  for (const prop of requiredProperties) {
    const permissionArray = permissions[prop];
    for (let i = 0; i < permissionArray.length; i++) {
      if (typeof permissionArray[i] !== 'string') {
        console.warn(`Permission property ${prop}[${i}] is not a string:`, permissionArray[i]);
        return false;
      }
    }
  }

  return true;
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
        console.log('✅ Permissions validated successfully:', {
          collections: permissions.collections?.length || 0,
          programs: permissions.programs?.length || 0,
          profile: permissions.profile?.length || 0,
          institutions: permissions.institutions?.length || 0,
        });
        state.permissions = permissions;
      } else {
        console.warn('❌ Invalid permissions format received:', permissions);
        state.permissions = permissionsInitialState;
      }
      state.institutionIds = institutionIds;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
