import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthType } from '../api/auth.service';

interface InitialStateAuthType {
  token: string;
}

const initialState: InitialStateAuthType = {
  token: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken: (state, payload) => {
      state.token = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.token = '';
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<AuthType>) => {
        state.token = action.payload.token ?? '';
        // SecureStore.setItemAsync('token', action.payload.token ?? '');
      },
    );
    builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
      state.token = '';
    });
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action: PayloadAction<AuthType>) => {
        state.token = action.payload.token ?? '';
        // SecureStore.setItemAsync('token', action.payload.token ?? '');
      },
    );
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
