import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../service/auth.service';
import { Permissions, PermissionType, SpecificAction } from '../service/types/auth.types';

interface InitialStateAuthType {
  token: string;
  permissions: Permissions;
  institutionIds: string[];
}

const permissionsInitialState: Permissions = {
  collections: {
    general: [PermissionType.READ],
    specific: [],
  },
  programs: {
    general: [],
    specific: [],
  },
  profile: {
    general: [],
    specific: [],
  },
};

const initialState: InitialStateAuthType = {
  token: '',
  permissions: permissionsInitialState,
  institutionIds: [],
};

const mockedPermissions = (
  type: 'fullAccess' | 'readOnly' | 'readOnlyCollections' | 'admin',
): Permissions => {
  switch (type) {
    case 'fullAccess':
      return {
        collections: {
          general: [
            PermissionType.READ,
            PermissionType.CREATE,
            PermissionType.UPDATE,
            PermissionType.DELETE,
          ],
          specific: [
            SpecificAction.ADD_STUDENT,
            SpecificAction.EDIT_STUDENTS_LIST,
            SpecificAction.EDIT_CONTENT,
          ],
        },
        programs: {
          general: [
            PermissionType.READ,
            PermissionType.CREATE,
            PermissionType.UPDATE,
            PermissionType.DELETE,
          ],
          specific: [
            SpecificAction.ADD_STUDENT,
            SpecificAction.EDIT_STUDENTS_LIST,
            SpecificAction.EDIT_CONTENT,
          ],
        },
        profile: {
          general: [PermissionType.READ, PermissionType.UPDATE],
          specific: [],
        },
      };
    case 'readOnly':
      return {
        collections: {
          general: [PermissionType.READ],
          specific: [],
        },
        programs: {
          general: [PermissionType.READ],
          specific: [],
        },
        profile: {
          general: [PermissionType.READ],
          specific: [],
        },
      };
    case 'readOnlyCollections':
      return {
        collections: {
          general: [PermissionType.READ],
          specific: [],
        },
        programs: {
          general: [],
          specific: [],
        },
        profile: {
          general: [PermissionType.READ],
          specific: [],
        },
      };
    case 'admin':
      return {
        collections: {
          general: [PermissionType.READ, PermissionType.CREATE, PermissionType.DELETE],
          specific: [
            SpecificAction.ADD_STUDENT,
            SpecificAction.EDIT_STUDENTS_LIST,
            SpecificAction.EDIT_CONTENT,
          ],
        },
        programs: {
          general: [PermissionType.READ, PermissionType.CREATE, PermissionType.DELETE],
          specific: [
            SpecificAction.ADD_STUDENT,
            SpecificAction.EDIT_STUDENTS_LIST,
            SpecificAction.EDIT_CONTENT,
          ],
        },
        profile: {
          general: [PermissionType.READ],
          specific: [],
        },
      };
    default:
      return {
        collections: {
          general: [PermissionType.READ],
          specific: [],
        },
        programs: {
          general: [PermissionType.READ],
          specific: [],
        },
        profile: {
          general: [PermissionType.READ],
          specific: [],
        },
      };
  }
};

const isPermissions = (permissions: any): permissions is Permissions => {
  if (
    permissions &&
    typeof permissions === 'object' &&
    'collections' in permissions &&
    'programs' in permissions &&
    'profile' in permissions
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
      state.permissions = mockedPermissions('admin');
    });
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      const permissions = action.payload.permissions;
      const institutionIds = action.payload.institutionIds || [];
      if (isPermissions(permissions)) {
        state.permissions = permissions;
      } else {
        console.warn('Invalid permissions format received:', permissions);
        state.permissions = mockedPermissions('readOnly');
      }
      state.institutionIds = institutionIds;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
