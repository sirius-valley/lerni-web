import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counter.slice';
import pokemonSlice from './slices/pokemon.slice';
import { api } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    counter: counterSlice,
    pokemon: pokemonSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
