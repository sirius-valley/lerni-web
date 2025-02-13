import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../service/auth.service';
import { Permissions, PermissionType, SpecificAction } from '../service/types/auth.types';

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
    general: [],
    specific: [],
  },
};

const initialState: InitialStateAuthType = {
  token: '',
  permissions: permissionsInitialState,
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
      };
  }
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
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
