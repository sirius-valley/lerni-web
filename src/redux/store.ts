import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counter.slice';
import pokemonSlice from './slices/pokemon.slice';
import { api } from './service/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/auth.slice';
import utilsSlice from './slices/utils.slice';
import programSlice from './slices/program.slice';
import collectionSlice from './slices/collection.slice';
import groupsSlice from './slices/groups.slice';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
  utils: utilsSlice,
  counter: counterSlice,
  program: programSlice,
  collection: collectionSlice,
  groups: groupsSlice,
  pokemon: pokemonSlice,
});

const RESET_ALL_STATES = 'store/reset';

const combinedReducer = (state: any, action: any) => {
  if (action.type === RESET_ALL_STATES) {
    // Reset all slices to their initial state
    state = undefined;
    localStorage.removeItem('token');
  }
  // @ts-ignore
  return reducers(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// This action will reset all redux state.
export const resetAllStates = () => ({ type: RESET_ALL_STATES });

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
